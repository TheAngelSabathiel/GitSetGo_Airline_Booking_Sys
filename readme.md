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
1. **Customer Transactional Core:** End-to-end management of the booking lifecycle, including flight search based on Airports.iataCode and date. The system handles the creation of the Booking document, linking it to Customers, FlightSchedules, and FareClasses. It includes processing Payments via an external gateway and managing AncillaryServices purchases.
2. **Inventory Management:** Real-time synchronization and tracking of seat availability for every flight instance via the FlightSeats collection, with strict consistency checks on the isAvailable status.
3. **Administrative CRUD:** Provision of an interface for authorized users to perform CRUD (Create, Read, Update, Delete) operations on core master data collections, including FlightSchedules, Aircrafts, Airports, and FareClasses.

**Out-of-Scope Functionality (WILL NOT DO)**:
1. **Legacy Systems Integration:** The system will not integrate with external Global Distribution Systems (GDS) or Departure Control Systems (DCS).
2. **Operational Logging:** No storage or management of operational data such as crew duty rosters, aircraft maintenance, or fuel planning logs.
3. **Financial & Accounting:** No complex financial modeling, revenue management, or general ledger (GL) integration. The Payments collection is strictly for transaction audit reference (storing the external transactionRef).

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

## 4. Overall Description
- **Product Perspective**: Describe how this application fits into a larger system or context.
- **Product Functions**: Provide a high-level overview of the main functionalities.
- **User Classes and Characteristics**: Describe the different types of users.
- **Operating Environment**: Specify the hardware, software, and network environment.
- **Assumptions and Dependencies**: List any assumptions made and dependencies on other projects or technologies.

## 5. Visual Mockup Reference
- **Link or Screenshot**: Provide a link to the visual mockup or include a screenshot.

## 6. Features
- **Feature 1**: Description
- **Feature 2**: Description
- **Feature 3**: Description
- (Add more features as necessary)

## 7. Functional Requirements
### Use Cases
- **Use Case 1**:
  - **Title**: 
  - **Description**: 
  - **Actors**: 
  - **Preconditions**: 
  - **Postconditions**: 
  - **Main Flow**: 
  - **Alternate Flows**: 

### System Features
- **Feature 1**:
  - **Description**: 
  - **Priority**: 
  - **Inputs**: 
  - **Processing**: 
  - **Outputs**: 
  - **Error Handling**: 

## 8. Non-Functional Requirements
- **Performance**: Describe performance requirements.
- **Security**: Outline security needs.
- **Usability**: Detail user interface and experience considerations.
- **Reliability**: Define reliability and availability requirements.
- **Supportability**: Specify maintenance and support requirements.

## 9. Data Requirements
- **Data Models**: Include simple diagrams if possible.
- **Database Requirements**: Describe tables and relationships.
- **Data Storage and Retrieval**: Explain how data will be stored and accessed.
- **ERD**: Add the ERD for the database models based on Specifications.

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
