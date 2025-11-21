# GitSetGo Airline Booking System
# Technical Specifications Document

## 1. Title Page
- **Project Name**: Parallox Airline Booking System
- **Version**: 1.0
- **Date**: November 21, 2025
- **Author(s)**: 

  1. Rick San Mateo
  2. Leigh Tamayo
  3. Roldan Estobio
  4. Jan Michael Agapay
  5. Janel Bianca San Jose
  6. Pedro Jose Siapuatco
  7. Jomari Angel Jacinto

## 2. Table of Contents
1. [Introduction](#3-introduction)
2. [Overall Description](#4-overall-description)
3. [Visual Mockup Reference](#5-visual-mockup-reference)
4. [Features](#6-features)
5. [Functional Requirements](#7-functional-requirements)
6. [Non-Functional Requirements](#8-non-functional-requirements)
7. [Data Requirements](#9-data-requirements)
8. [External Interface Requirements](#10-external-interface-requirements)
9. [Glossary](#11-glossary)
10. [Appendices](#12-appendices)

## 3. Introduction
### 3.1 Purpose:
  
The fundamental purpose of this Technical Specifications Document (TSD) is to establish the definitive technical blueprint for the Parallox Airline Booking and Management System (P-ABMS). This document specifies the complete functional and non-functional requirements to guide the development team. The P-ABMS must be implemented on the specified MEAN/MERN stack (MongoDB, Express.js, Node.js, and Vue/React) to create a modern, scalable, and efficient platform supporting Parallox Airline's strategy for direct customer distribution and operational efficiency.

### 3.2 Scope:
  
The scope of the P-ABMS is defined by the Customer-Facing Booking Portal and the Internal Administration Platform, with all data operations mapped directly to the provided Entity-Relationship Diagram (ERD).

**In-Scope Functionality (WILL DO)**:  
**1. Customer Transactional Core:** End-to-end management of the booking lifecycle, including flight search based on Airports.iataCode and date. The system handles the creation of the Booking document, linking it to Customers, FlightSchedules, and FareClasses. It includes processing Payments via an external gateway and managing AncillaryServices purchases.  
**2. Inventory Management:** Real-time synchronization and tracking of seat availability for every flight instance via the FlightSeats collection, with strict consistency checks on the isAvailable status.  
**3. Administrative CRUD:** Provision of an interface for authorized users to perform CRUD (Create, Read, Update, Delete) operations on core master data collections, including FlightSchedules, Aircrafts, Airports, and FareClasses.  

**Out-of-Scope Functionality (WILL NOT DO)**:  
**1. Legacy Systems Integration:** The system will not integrate with external Global Distribution Systems (GDS) or Departure Control Systems (DCS).  
**2. Operational Logging:** No storage or management of operational data such as crew duty rosters, aircraft maintenance, or fuel planning logs.  
**3. Financial & Accounting:** No complex financial modeling, revenue management, or general ledger (GL) integration. The Payments collection is strictly for transaction audit reference (storing the external transactionRef).  

- **Definitions, Acronyms, and Abbreviations**: List any terms or acronyms used.
- **References**: List any documents or sources referenced.

### 3.3 Definitions, Acronyms, and Abbreviations:

| Term/Acronym | Definition |
|--------------|------------|
| P-ABMS | Parallox Airline Booking and Management System. |
| TSD | Technical Specifications Document. |
| MEAN/MERN Stack | The required architecture: MongoDB (Database), Express.js (Backend Framework), Node.js (Runtime Environment), and Vue/React (Frontend Frameworks). |
| PNR | **Passenger Name Record** — the unique booking identifier and itinerary reference (represented in the system by the *Bookings* collection). |
| NoSQL | Non-relational database architecture (MongoDB), known for its document-based flexible schema and horizontal scalability. |
| CRUD | Create, Read, Update, Delete — the fundamental database operations. |
| IATA Code | International Air Transport Association three-letter airport code. |

### 3.4 References:

- Airline Booking System Entity-Relationship Diagram (ERD).drawio.png
- External Payment Gateway API Specification v2.1.
- OWASP Top 10 Security Guidelines.


## 4. Overall Description
### 4.1 Product Perspective:
The **Parallox Airline Booking and Management System (P-ABMS)** is architected as a modern, three-tier, cloud-native application built using the **MEAN/MERN stack**. It serves as the airline’s direct sales channel and core inventory data repository.

**System Architecture Overview**

**1. Presentation Tier (Frontend)**
- Built with **Vue.js** or **React**
- Runs in the user's browser
- Responsible for rendering the dynamic **User Interface (UI)** and handling user interactions

**2. Application Tier (Backend)**
- Implemented using **Node.js** with **Express.js**
- Acts as the central **REST API**
- Implements all **business logic**, request validation, authentication, and security controls

**3. Data Tier (Database)**  
- Powered by **MongoDB**
- Stores all application data using a **document-based model**
- Utilizes document references to maintain the relationships defined in the **Entity Relationship Diagram (ERD)**

### 4.2 Product Functions:
The **P-ABMS** provides comprehensive functionality, segmented into four key technical areas:

**1. Customer Transactional Core**
- Supports end-to-end management of the booking lifecycle.
- Handles flight search and real-time seat inventory display by querying the **FlightSeats** and **FlightSchedules** collections.
- Facilitates secure payment integration through the dedicated API service layer.
- Generates and issues the **PNR (Booking Reference)** once a booking is successfully confirmed.

**2. Data Persistence Layer**
- Manages and optimizes queries within the **MongoDB** document database.
- Stores, updates, and retrieves core data collections such as **FlightSchedules**, **Aircrafts** specifications, **Customers** profiles, and **Bookings**.
- Ensures data integrity across collections using cross-document references and transactional logic when applicable.

**3. Service Integration**
- Implements the **Node.js/Express.js** API for secure, high-throughput communication.
- Integrates with the external **Payment Gateway** to process financial transactions.
- Connects with an **Email Service Provider** to deliver customer notifications, such as booking confirmations.

**4. Administrative CRUD**
- Provides an interface for authorized Administrator users.
- Supports Create, Read, Update, and Delete (CRUD) operations for master data collections, including **FlightSchedules**, **Airports**, **FareClasses**, and **AncillaryServices**.

### 4.3 User Classes and Characteristics:
The system supports two main classes of users, with access rights enforced by the Express.js backend.

| **User Class** | **Characteristics** | **Authorization Level** |
|----------------|----------------------|---------------------------|
| **Customer** | General public, focused on efficient self-service. Requires authentication to manage their own bookings and profile information. | **Limited:** Access restricted only to their own data (`customerId`). |
| **Administrator (Admin)** | Airline staff with operational responsibility, requiring full data visibility and modification capabilities. Authenticated through the internal Admin dashboard. | **High:** Full access to Admin-specific API endpoints. |

### 4.4 Operating Environment:
The operating environment is defined by the following required technologies:

| **Component** | **Technology** | **Deployment Environment** | **Purpose** |
|---------------|----------------|-----------------------------|-------------|
| **Runtime** | Node.js (LTS) & Express.js | Cloud Hosting (generic) using container orchestration (e.g., Docker/Kubernetes) | Executes the backend API and business logic; ensures high availability and scalability. |
| **Frontend** | Vue.js/React (HTML5, CSS, Bootstrap) | Static Web Hosting with a Content Delivery Network (CDN) | Provides a fast, responsive, and secure customer-facing interface. |
| **Database** | MongoDB | Managed Cloud Database Service | Stores all persistent data, indexed for high throughput and low-latency queries. |
| **Networking** | N/A | Load Balancer & Virtual Private Cloud (VPC) equivalent | Distributes traffic securely and ensures application resilience across multiple nodes. |

### 4.5 Authentication Procedure in Express.js
The Express.js backend implements a stateless, token-based authentication mechanism using JSON Web Tokens (JWTs), ensuring secure and efficient API access.

| **Procedure** | **Description** | **Express.js Implementation** |
|---------------|-----------------|-------------------------------|
| **Authentication** | User logs in, and the system validates the submitted password hash (using bcrypt) against the `Customers` collection. | The `/api/auth/login` route handles credential verification. |
| **Token Generation** | When authentication succeeds, a JWT is generated and signed. Its payload includes the `userId` and `isAdmin` role flag. | The `jsonwebtoken` library is used to produce the secure, signed token. |
| **Access Control** | The client includes the JWT in all protected API requests. Middleware verifies the signature and enforces Role-Based Access Control (RBAC). | Custom Express middleware checks the extracted role against route-level permissions before executing the handler. |

- **Product Perspective**: Describe how this application fits into a larger system or context.
- **Product Functions**: Provide a high-level overview of the main functionalities.
- **User Classes and Characteristics**: Describe the different types of users.
- **Operating Environment**: Specify the hardware, software, and network environment.
- **Assumptions and Dependencies**: List any assumptions made and dependencies on other projects or technologies.

### 4.6 Assumptions and Dependencies
**Assumption:**
The data relationships defined in the ERD will be effectively modeled in MongoDB using a combination of references and embedded documents, with the Express.js application layer responsible for maintaining transactional integrity.

**Dependency:**
A fully documented, stable, and PCI DSS–compliant external Payment Gateway API must be available for integration.

**Dependency:**
A reliable email service API (SMTP or cloud-based provider) is required to send confirmation emails and system notifications.

## 5. Visual Mockup Reference
- **Link or Screenshot**: Provide a link to the visual mockup or include a screenshot.

## 6. Features
### 6.1 Core Features

The following table lists the core functionalities derived from the system scope and the MongoDB data model (as defined by the ERD).

| **Feature ID** | **Feature Name** | **Description** | **Priority** |
|----------------|------------------|------------------|--------------|
| **FEAT-001** | Flight Search & Schedule Display | Enables users to query `FlightSchedules` by `Airports.iataCode` and date, displaying real-time availability and dynamic pricing across `FareClasses`. | High |
| **FEAT-002** | PNR Generation & Booking Finalization | Handles end-to-end creation of the confirmed `Booking` document (PNR) following successful payment, linking it to `Customers` and related entities. | High |
| **FEAT-003** | Secure Payment Execution | Implements the Express.js API endpoint for secure, high-throughput integration with the external Payment Gateway and creates auditable `Payments` records. | High |
| **FEAT-004** | Seat Map & Ancillary Selection | Allows users to view the specific `Aircrafts` seat map, select available `FlightSeats`, and add `AncillaryServices`. | High |
| **FEAT-005** | User Authentication & Profile Management | Implements JWT-based authentication for secure login/registration and management of `Customers` profile data. | High |
| **FEAT-006** | Admin CRUD & Master Data | Provides Admin CRUD capabilities for core master collections: `FlightSchedules`, `Airports`, and `Aircrafts`. | High |
| **FEAT-007** | Booking Retrieval & Detail View | Allows users to retrieve their `Booking` using the PNR, displaying linked `FlightSchedules` and `Payments` status. | Medium |
| **FEAT-008** | Atomic Seat Hold | Implements a time-limited, transactional lock on `FlightSeats` to prevent simultaneous reservations. | Medium |
| **FEAT-009** | Price Calculation & Checkout | Aggregates base fare, ancillary charges, and taxes to compute the final `totalPrice` before payment. | Medium |
| **FEAT-010** | Transactional Email Notifications | Sends automated emails (confirmation, schedule changes) triggered by `Bookings` and `FlightSchedules` updates. | Medium |

---

### 6.2 Priority Matrix Summary

Priority is determined by necessity for the Minimum Viable Product (MVP) and core transactional integrity.

| **Priority Level** | **Description** | **Corresponding Features** |
|--------------------|------------------|-----------------------------|
| **High (H)** | Mission Critical — essential for successful transactions and core operation of P-ABMS. | FEAT-001, FEAT-002, FEAT-003, FEAT-004, FEAT-005, FEAT-006 |
| **Medium (M)** | Core Support — important for customer experience, integrity, and auditability. | FEAT-007, FEAT-008, FEAT-009, FEAT-010 |


## 7. Functional Requirements
### 7.1 Use Cases

#### Use Case 1: Customer Registration
**Title:** Customer Registration  
**Description:** A guest user creates a new `Customers` profile by providing personal details and credentials.  
**Actors:** Guest User, P-ABMS System  
**Preconditions:** User provides a unique email address.  
**Postconditions:** A new `Customers` document is created in MongoDB with the password securely hashed.  

**Main Flow:**
1. Actor submits details (`firstName`, `lastName`, `email`, `password`) to the registration endpoint.  
2. System validates input (email format, password strength).  
3. Express.js uses bcrypt to hash the password.  
4. System checks the `Customers` collection for email uniqueness.  
5. System inserts the new `Customers` document.  
6. System automatically authenticates the user or prompts them to log in.  

**Alternate Flows:**
- **A1: Email Exists:** System returns **409 Conflict** and prompts the user to log in or use a different email.

---

#### Use Case 2: User Login
**Title:** User Login  
**Description:** A registered user authenticates, receiving a JWT for secure access to protected resources.  
**Actors:** Customer, Administrator, P-ABMS System  
**Preconditions:** User has a valid `Customers` record.  
**Postconditions:** The client receives a valid JWT containing the user's ID and role (`isAdmin`).  

**Main Flow:**
1. Actor submits email and password to `/api/auth/login`.  
2. Express.js retrieves the user record from MongoDB by email.  
3. System uses bcrypt to compare the submitted password with the stored `passwordHash`.  
4. If credentials match, System generates a signed JWT containing `customerId` and `isAdmin`.  
5. System returns the JWT to the client.  

**Alternate Flows:**
- **A1: Invalid Credentials:** System returns **401 Unauthorized**, without specifying whether the email or password was incorrect.

---

#### Use Case 3: Book a Flight
**Title:** Book a Flight  
**Description:** A Customer searches for and reserves a seat, processes payment, and confirms the booking, resulting in a PNR.  
**Actors:** Customer, Guest User, P-ABMS System, Payment Gateway  
**Preconditions:** `FlightSchedules` exist with available `FlightSeats`. Payment Gateway is reachable.  
**Postconditions:** A `Booking` and a linked `Payments` document are created. The selected `FlightSeat.isAvailable` is set to `false`.  

**Main Flow:**
1. **Search:** Actor sends GET request to `/api/flights/search`.  
2. **Selection:** Actor selects flight, FareClass, and seat. System initiates a time-limited seat hold.  
3. **Transaction:** Actor proceeds to checkout and completes UC6 & UC7.  
4. **Finalize:** After payment success, system confirms Booking, updates `FlightSeats`, and creates the `Payments` record.  
5. System displays and emails the PNR.  

**Alternate Flows:**
- **A1: Payment Failure:** Payment status set to `FAILED`, seat hold released.  
- **A2: Seat Conflict:** System returns **409 Conflict** and prompts re-selection.

---

#### Use Case 4: Admin Manage Flight Schedule
**Title:** Admin Manage Flight Schedule  
**Description:** Administrator creates, updates, or cancels a flight schedule, generating or retiring inventory.  
**Actors:** Administrator, P-ABMS System  
**Preconditions:** Admin authenticated via JWT; master data (`Aircrafts`, `Airports`) exists.  
**Postconditions:** A `FlightSchedules` document is created/updated; corresponding `FlightSeats` are generated or retired.  

**Main Flow:**
1. Admin logs in and obtains an authorized JWT.  
2. **Creation:** Admin submits the schedule details.  
3. System validates all reference IDs (e.g., `aircraftId`).  
4. System reads `Aircrafts.capacity` and generates all `FlightSeats`.  
5. System confirms success.  

**Alternate Flows:**
- **A1: Flight Cancellation:** Admin sets status to `CANCELLED`; system retires seats and triggers notifications/refunds.  
- **A2: Invalid Reference:** System returns **400 Bad Request**.

---

#### Use Case 5: Retrieve Booking / Flight Records
**Title:** Retrieve Booking and Flight Details  
**Description:** User retrieves their confirmed booking using the PNR.  
**Actors:** Customer, Guest User, P-ABMS System  
**Preconditions:** Booking exists and is confirmed.  
**Postconditions:** System returns complete booking details and linked flight information.  

**Main Flow:**
1. Actor inputs PNR (`bookingReference`) and last name.  
2. System queries `Bookings` for the PNR.  
3. System verifies the last name.  
4. System fetches linked `FlightSchedules`, `FlightSeats`, and `Payments`.  
5. System returns the structured booking details.  

**Alternate Flows:**
- **A1: Record Not Found:** System returns **404 Not Found**.  
- **A2: Verification Failure:** System returns **401 Unauthorized**.

---

#### Use Case 6: Checkout Process (Before Payment)
**Title:** Checkout Process and Price Calculation  
**Description:** System calculates the authoritative total price before initiating payment.  
**Actors:** Customer, P-ABMS System  
**Preconditions:** Seat selected and seat hold is active.  
**Postconditions:** Temporary Booking structure finalized with validated `totalPrice`.  

**Main Flow:**
1. Actor enters passenger and contact details.  
2. Actor confirms ancillary selections.  
3. System calculates: Base Fare + Ancillary Charges + Taxes = `totalPrice`.  
4. System validates the price against live fare data.  
5. System finalizes the temporary Booking object and presents final price.  

**Alternate Flows:**
- **A1: Price Mismatch:** Actor is notified and must accept updated pricing.

---

#### Use Case 7: Secure Payment Execution
**Title:** Secure Payment Execution  
**Description:** The system processes the payment through the Payment Gateway and records the result.  
**Actors:** Customer, P-ABMS System, Payment Gateway  
**Preconditions:** Checkout (UC6) complete, price confirmed, seat hold active.  
**Postconditions:** A `Payments` document is created with `transactionRef` and `status`.  

**Main Flow:**
1. Actor submits tokenized/encrypted payment details.  
2. Express.js sends payment data and `totalPrice` to Payment Gateway.  
3. Gateway returns status and `transactionRef`.  
4. System creates a `Payments` document with the final status.  
5. If SUCCESS: System proceeds to booking finalization (UC3).  

**Alternate Flows:**
- **A1: Payment Declined:** Status set to `FAILED`; user notified and seat hold is maintained for a short period.

---

### 7.2 System Features

#### Feature 1: Seat Inventory Control
**Description:** Manages atomic seat reservation using time-limited locks to prevent overbooking.  
**Priority:** High  
**Inputs:** `flightSeatId`, `sessionId` or `customerId`, `reservationDuration`  

**Processing:**
- **Lock Attempt:** System performs atomic update using MongoDB conditional operators.  
- **Lock:** Sets `reservedBy` and `reservedUntil`.  
- **Cleanup:** Background worker releases expired locks.  

**Error Handling:**  
Returns `SEAT_UNAVAILABLE` if lock fails; user must re-select a seat.

---

#### Feature 2: Admin Schedule Generation
**Description:** Automatically generates all `FlightSeats` when a new `FlightSchedules` document is created.  
**Priority:** High  
**Inputs:** Validated `FlightSchedules` details including `aircraftId`.  

**Processing:**
- **Read Capacity:** System retrieves `capacity` from `Aircrafts`.  
- **Insert:** Creates all `FlightSeats` using a bulk insert operation.  

**Error Handling:**  
If the bulk insert fails, the `FlightSchedules` creation is rolled back to maintain inventory integrity.


## 8. Non-Functional Requirements
### 8.1 Performance

Performance requirements focus on handling high traffic efficiently, leveraging Node.js async behavior and MongoDB indexing.

| **Requirement ID** | **Description** | **Metric** | **Target** |
|-------------------|----------------|------------|------------|
| **NFR-P01** | Flight Search Latency | Time from request to response for `/api/flights/search` | 95th percentile < 500 ms |
| **NFR-P02** | Booking Transaction Throughput | Number of successful bookings (PNR creation) per second | ≥ 50 transactions/sec |
| **NFR-P03** | API Response Time | Response time for all authenticated CRUD operations (e.g., Admin updates) | Average < 200 ms |
| **NFR-P04** | Concurrency | Maximum concurrent users without performance degradation (>500 ms latency) | 5,000 concurrent active users |

---

### 8.2 Security

Focuses on protecting customer data, securing API endpoints, and compliance with payment industry standards.

| **Requirement ID** | **Description** | **Enforcement Mechanism / Standard** |
|-------------------|----------------|-------------------------------------|
| **NFR-S01** | User Data Protection | Store all sensitive customer passwords using one-way hashing | bcrypt, salt factor ≥ 12 |
| **NFR-S02** | API Authentication | All non-public endpoints require a valid JWT | Express Middleware enforcing JWT validation and RBAC |
| **NFR-S03** | Input Sanitization | Sanitize all queries, params, and body inputs to prevent injection | Libraries like `express-mongo-sanitize` for NoSQL Injection prevention |
| **NFR-S04** | Payment Compliance | Do not store raw card data (PCI DSS scope reduction) | Use tokenization via Payment Gateway; only store `Payments.transactionRef` |
| **NFR-S05** | SSL/TLS Enforcement | Encrypt all client-API communications | Enforce TLS 1.2+ for all connections |

---

### 8.3 Usability (User Interface & Experience)

Ensures the system is intuitive and accessible for customers and administrators.

| **Requirement ID** | **Description** | **Scope / Metric** |
|-------------------|----------------|------------------|
| **NFR-U01** | Interface Consistency | UI/UX design adheres to a single design system (Bootstrap/Material UI) | 100% compliance across pages/modules |
| **NFR-U02** | Accessibility | Public booking portal meets accessibility standards | WCAG 2.1 Level AA |
| **NFR-U03** | Error Clarity | Display clear, actionable messages for all validation/system errors | >90% of errors self-explanatory |
| **NFR-U04** | Mobile Responsiveness | Booking portal functions and displays correctly on standard mobile devices | Fully responsive down to 360px viewport width |

---

### 8.4 Reliability and Availability

Ensures P-ABMS remains operational and recovers quickly from failures.

| **Requirement ID** | **Description** | **Metric / Target** |
|-------------------|----------------|------------------|
| **NFR-R01** | System Availability | Percent time system is operational | 99.9% uptime (~8.7 hrs downtime/year) |
| **NFR-R02** | Mean Time to Recover (MTTR) | Average time to restore service after outage | < 30 minutes |
| **NFR-R03** | Data Integrity (Concurrency) | Guarantee consistency of critical data (FlightSeats) during concurrent updates | 100% transactional integrity (no double-bookings) |
| **NFR-R04** | Disaster Recovery | Restore entire MongoDB database from backup in separate region | RPO < 1 hour |

---

### 8.5 Supportability (Maintainability & Operation) 🛠️

Focuses on ease of updating, debugging, and maintaining the system over its lifecycle.

| **Requirement ID** | **Description** | **Focus Area / Requirement** |
|-------------------|----------------|----------------------------|
| **NFR-M01** | Code Maintainability | Backend (Node.js/Express.js) | Follow ESLint standards; document complex functions with JSDoc |
| **NFR-M02** | Centralized Logging | Operations & Monitoring | Log all API requests, errors, and warnings to a centralized, searchable system (e.g., ELK stack) |
| **NFR-M03** | Configuration Management | Deployment | All environment-specific variables (API keys, DB URI, JWT secret) must be configurable via environment variables, not hardcoded |
| **NFR-M04** | Monitoring & Health Checks | System Status | Expose unauthenticated health check endpoints (`/health/live`, `/health/ready`) for load balancers and monitoring tools |


## 9. Data Requirements
## 9.1 Data Models: Conceptual Overview

The **P-ABMS** utilizes a document-based NoSQL model (**MongoDB**), managing relationships primarily through references (`_id` fields) rather than strict joins. This approach optimizes read performance and horizontal scalability.

- **Core Entities:** `Customers`, `Bookings`, `FlightSchedules`, `Aircrafts`, `Airports`  
- **Transactional Entities:** `FlightSeats`, `Payments`, `AncillaryServices`  

This document-centric model contrasts with traditional relational (table-based) models but allows for flexible schemas and efficient storage of complex objects (e.g., a full `Booking` record containing passenger details).

---

## 9.2 Database Requirements (MongoDB Collections and Relationships)

The logical design is implemented via **MongoDB collections**. Relationships are established using 1-to-N references (storing the ID of the "one" side on the "many" side).

| **Collection** | **Description** | **Key Relationships (References)** |
|----------------|----------------|----------------------------------|
| **Customers** | Stores user profiles and authentication hashes (`passwordHash`). | 1:N to `Bookings` (via `customerId`) |
| **Airports** | Master data for all served airports; indexed by `iataCode`. | 1:N to `FlightSchedules` (via `departureAirportId`, `arrivalAirportId`) |
| **Aircrafts** | Master data for aircraft types and seat configurations (`capacityEconomy`, `capacityBusiness`). | 1:N to `FlightSchedules` (via `aircraftId`) |
| **FlightSchedules** | Stores scheduled flight instances (date, time, aircraft, route). | 1:N to `FlightSeats` (via `flightScheduleId`) |
| **FlightSeats** | Atomic unit of inventory; tracks availability (`isAvailable`) and location (`seatNumber`). | 1:1 to a confirmed `Booking` (once booked) |
| **Bookings** | Core transactional record (PNR); stores passenger details and overall status. | N:1 to `Customers`, N:1 to `FlightSchedules`, 1:1 to `Payments` |
| **Payments** | Audit trail for payment transactions; stores external gateway reference (`transactionRef`) and final status. | N:1 to `Bookings` |
| **AncillaryServices** | Stores bookable extras (meals, luggage). | N:N to `Bookings` (via embedded array or linking collection) |

---

## 9.3 Data Storage and Retrieval

### Storage Strategy: Document Embedding vs. Referencing
- **Referencing (Normalization):** Used for large, frequently updated, or master data entities (`FlightSchedules`, `Customers`). The system stores the `_id` and performs lookups at the application layer.  
- **Embedding (Denormalization):** Used for stable or frequently read data that is intrinsically part of the parent document (e.g., small passenger lists or ancillary selections inside the `Bookings` document). This reduces the number of queries needed.

### Retrieval Strategy: Indexing for Performance
- **Primary Indexes:** `_id` field is indexed automatically.  
- **Search Indexes:** Compound indexes on `FlightSchedules` for flight search:  
  *```json
  { "departureAirportId": 1, "arrivalAirportId": 1, "departureTime": 1 }*
- **Transactional Indexes:**  
  Unique indexes on `Bookings.bookingReference` (PNR) to ensure fast lookup and enforce uniqueness (supports FEAT-007).
- **Security Indexes:**  
  Index on `Customers.email` to guarantee uniqueness and accelerate login validation (Use Case 2).


## 10. External Interface Requirements
- **User Interfaces**: Provide sketches or descriptions of the user interface.
- **API Interfaces**: Briefly describe any APIs.
- **Hardware Interfaces**: Mention any required hardware interactions.
- **Software Interfaces**: Note any software interactions.

## 11. Glossary
- **Term 1**: Definition
- **Term 2**: Definition

## 12. Appendices
- **Supporting Information**: Add any additional information here.
- **Revision History**: Record any changes made to the document with dates and descriptions.
