# Product Requirements Document
# Montreal Restaurant Recommendation Web Application

**Version:** 2.0  
**Date:** April 8, 2026  
**Status:** Draft  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals](#3-goals)
4. [Target User](#4-target-user)
5. [Feature Requirements](#5-feature-requirements)
6. [Technical Stack](#6-technical-stack)
7. [User Flow](#7-user-flow)
8. [Data Models](#8-data-models)
9. [Page Inventory](#9-page-inventory)
10. [Out of Scope](#10-out-of-scope)

---

## 1. Executive Summary

This document defines the product requirements for a focused web application that helps users in Montreal discover restaurants suited to their eating demands. The application has three core capabilities: authenticating users securely via JWT or OAuth through social providers, collecting the user's dining preferences after login, and returning a simple list of recommended restaurants that match those preferences. The scope is intentionally narrow — no social features, no reservations, no AI engine.

---

## 2. Problem Statement

- Finding a restaurant that matches a specific craving, dietary need, or budget still requires manually browsing multiple platforms.
- Generic recommendation tools do not ask what a user actually wants before surfacing results.
- There is no lightweight, authenticated experience that goes from "I'm hungry and have preferences" to "here is a short list of places" in one flow.

---

## 3. Goals

- Allow a user to create an account and sign in securely using an email/password pair (JWT) or a social provider (OAuth).
- After signing in, collect the user's immediate eating demands through a simple preference form.
- Return a list of restaurants that match those demands so the user can make a decision quickly.

---

## 4. Target User

**The Hungry User** — anyone in Montreal who knows roughly what they want to eat and needs a quick, relevant list of places. They are comfortable signing in with Google or entering an email and password. They want to state their preferences once per session and immediately see results — not browse endlessly.

---

## 5. Feature Requirements

### 5.1 Authentication

**FR-AUTH-01 — Email / Password Registration & Login**
- Users can register with an email address and password.
- Passwords are hashed with bcrypt before storage.
- On successful login, the server issues a short-lived JWT access token (15-minute expiry) and a long-lived refresh token (30-day expiry).
- The access token is stored in memory (not localStorage); the refresh token is stored in an `HttpOnly` cookie.
- Protected routes redirect unauthenticated users to the Sign In page.

**FR-AUTH-02 — OAuth Social Login**
- Users can authenticate via at least one social provider: Google and/or GitHub.
- OAuth is handled via the Authorization Code flow (PKCE where applicable).
- On first OAuth login, a new `User` record is created automatically; subsequent logins reuse the existing record.
- After a successful OAuth callback, the server issues the same JWT/refresh-token pair as email login.

**FR-AUTH-03 — Session Continuity**
- A `/auth/refresh` endpoint accepts a valid refresh token and returns a new access token without requiring the user to log in again.
- Signing out invalidates the refresh token server-side and clears the cookie.

---

### 5.2 Dining Preference Input

**FR-PREF-01 — Preference Form**
- Immediately after authentication (first login or any subsequent login), authenticated users are presented with a preference form before seeing results.
- The form collects:
  - **Cuisine type** — single-select from a curated list (e.g., Japanese, Italian, Lebanese, Mexican, Québécois, Indian, Thai, Vietnamese, Greek, Other)
  - **Dietary restrictions** — multi-select checkboxes (None, Vegetarian, Vegan, Gluten-free, Halal, Kosher)
  - **Budget** — single-select ($ / $$ / $$$ / $$$$)
  - **Free-text craving field** — optional short text input (e.g., "something warm and spicy", "light lunch near downtown"); max 200 characters

**FR-PREF-02 — Preference Persistence**
- Submitted preferences are saved to the authenticated user's `UserPreference` record so they pre-populate on the next visit.
- The user can update preferences at any time by returning to the preference form via a link in the results page header.

**FR-PREF-03 — Form Validation**
- Cuisine type and budget are required fields; the form cannot be submitted without them.
- The free-text field is optional and limited to 200 characters with a visible character counter.

---

### 5.3 Restaurant Recommendations

**FR-REC-01 — Results List**
- After submitting the preference form, the application displays a flat list of up to 10 matching restaurants.
- Each list item shows:
  - Restaurant name
  - Cuisine type(s)
  - Price range ($ symbols)
  - Neighborhood
  - A short one-sentence description

**FR-REC-02 — Matching Logic**
- The backend filters the restaurant dataset by:
  1. Cuisine type match (exact or "Other" as wildcard)
  2. Price range match
  3. Dietary tag overlap (restaurants missing a required restriction are excluded)
- Results are ordered by the number of matching criteria, then alphabetically as a tiebreaker.
- The free-text craving field is stored for future use but does not affect filtering in this version.

**FR-REC-03 — Empty State**
- If no restaurants match the submitted preferences, the results page shows a clear empty state message and a prompt to broaden preferences.

**FR-REC-04 — Re-run**
- A "Change my preferences" link on the results page returns the user to the preference form with current values pre-filled.

---

## 6. Technical Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Backend | NestJS (Node.js, TypeScript) |
| ORM | Prisma |
| Database | PostgreSQL 16 |
| Authentication | Passport.js — JWT strategy + OAuth2 strategy (Google / GitHub) |
| Restaurant Data | Static seed data or Google Places API (read-only, seeded at startup) |
| Hosting | Vercel (frontend) + Railway or Render (API) |

### Architecture Overview

```
Browser (Next.js)
      │
      │  HTTPS
      ▼
NestJS API
  ├── /auth/register     POST — create user, return JWT
  ├── /auth/login        POST — verify credentials, return JWT
  ├── /auth/refresh      POST — exchange refresh token for new access token
  ├── /auth/logout       POST — invalidate refresh token
  ├── /auth/google       GET  — initiate Google OAuth flow
  ├── /auth/google/callback  GET — OAuth callback, return JWT
  ├── /preferences       GET / PUT — read and update UserPreference
  └── /restaurants       GET  — query restaurants by preference filters
      │
      ▼
PostgreSQL (via Prisma)
  ├── users
  ├── user_preferences
  └── restaurants
```

---

## 7. User Flow

```
Landing Page (unauthenticated)
        │
        ├── Sign Up (email/password)  ──► Account created → Preference Form
        │
        └── Sign In
              ├── Email / Password ──────► JWT issued → Preference Form
              └── OAuth (Google/GitHub) ─► JWT issued → Preference Form

Preference Form (authenticated)
        │
        │  Submit cuisine, dietary, budget, optional craving text
        ▼
Results Page
        │
        ├── View list of up to 10 matching restaurants
        │
        └── "Change my preferences" → back to Preference Form (pre-filled)
```

---

## 8. Data Models

### 8.1 User

```
User {
  id            UUID (PK)
  email         String (unique)
  passwordHash  String (nullable — null for OAuth-only users)
  oauthProvider String (nullable — e.g., "google", "github")
  oauthId       String (nullable — provider's user ID)
  displayName   String
  createdAt     DateTime
  updatedAt     DateTime
}
```

### 8.2 UserPreference

```
UserPreference {
  id                  UUID (PK)
  userId              UUID (FK → User, unique)
  cuisineType         String
  dietaryRestrictions String[]
  budget              Enum { BUDGET, MODERATE, UPSCALE, FINE_DINING }
  cravingText         String (nullable, max 200 chars)
  updatedAt           DateTime
}
```

### 8.3 Restaurant

```
Restaurant {
  id           UUID (PK)
  name         String
  cuisines     String[]
  priceRange   Enum { BUDGET, MODERATE, UPSCALE, FINE_DINING }
  neighborhood String
  dietaryTags  String[]
  description  String
  createdAt    DateTime
}
```

---

## 9. Page Inventory

| Page | Route | Auth Required | Description |
|---|---|---|---|
| Landing | `/` | No | Brief app description with Sign Up and Sign In CTAs |
| Sign Up | `/signup` | No | Email/password registration form and OAuth buttons |
| Sign In | `/signin` | No | Email/password login form and OAuth buttons |
| Preference Form | `/preferences` | Yes | Cuisine, dietary, budget, craving text form |
| Results | `/results` | Yes | Flat list of up to 10 matching restaurants |

---

## 10. Out of Scope

The following are explicitly excluded from this application:

- **AI / LLM recommendation engine** — Matching is handled by simple database filtering; no GPT integration.
- **Advanced search and filters** — There is no standalone search bar, map view, or filter panel beyond the preference form.
- **Map view** — No Mapbox or Google Maps integration.
- **Social features** — No saved lists, follows, activity feed, check-ins, or group decision sessions.
- **Reservation booking** — The application surfaces restaurant names and details only; no table booking.
- **Restaurant partner dashboard** — Restaurants cannot claim or manage listings.
- **Email verification** — Account creation does not require an email verification step.
- **Real-time data** — No wait times, live occupancy, or tonight's specials.
- **Restaurant detail pages** — Each result is a list item only; there are no individual restaurant pages.
- **Multi-language support** — The UI is English only.
- **Native mobile apps** — The web app is responsive but no iOS/Android app is planned.
- **Payments or deposits** — No payment processing of any kind.

---

*End of Document*

---

**Document Owner:** Product Team  
**Last Updated:** April 8, 2026  
**Next Review Date:** July 8, 2026
