# 16. Constraints

The constraints of the system can be mainly divided into 2 types: scheduling constraints, resource constraints, staff constraints, and budget constraints.

## Scheduling Constraints

The system must be finished within 3 months since starting date. Since the system is started at 25 August 2017, it must be finished before 26 November 2017.

## Resource Constraints

### Physical and Software Resources

The required servers are listed as follows:

- Web server for serving front-facing websites and static files.
- API server for serving API endpoints and connecting to the database for CRUD operations.
- Database server for storing a data permanently.
- Load balance server (used in this document as load balancer) for distributing incoming network traffic into different web servers.

The minimum requirements of the servers and supported clients are shown below:

| Specification | Client | Load Balancer | Web Server | API Server | File Server | Database Server |
| - | - | - | - | - | - | - |
| **Operating System**  | Windows, OSX, Ubuntu, Android, iOS | Ubuntu 16.04.3 x64 | Ubuntu 16.04.3 x64 | Ubuntu 16.04.3 x64 | Ubuntu 16.04.3 x64 | Ubuntu 16.04.3 x64 |
| **Required Software** | Chrome, Safari, Firefox, Edge, Internet Explorer 10, Opera | NGINX | Node.js v8.5.0 or newer | Python | - | PosgreSQL |
| **Hardware Specification** | Intel Core i3, 4 GB / 2 CPUs / 10 GB free disk drive (Desktop), 1 GB / 2 CPUs / 1 GB free storage (Mobile) |2 GB / 2 CPUs, 40 GB SSD disk | 2 GB / 2 CPUs / 40 GB SSD disk | 2 GB / 2 CPUs / 40 GB SSD disk | 2 GB / 2 CPUs / 40 GB SSD disk | 4 GB / 2 CPUs / 40 GB SSD disk |
| **Network Speed** | 1 – 10 Mbps | 300 Mbps | 300 Mbps | 300 Mbps | 300 Mbps | 300 Mbps |

## Staff Constraints

There are seven members in the system development team. Because of the tight scheduling constraints and the team being small, we use flat hierarchy structure for the team management, with a project coordinator as a main contact point for everyone else in the team.

| Name | Assigned Role | Description |
| - | - | - |
| Kasidit Iamthong | Front-end Developer | Build the system’s user-facing code and the architecture of its immersive user experiences. |
| Kawin Liaowongphuthorn | Front-end Developer | Build the system’s user-facing code and the architecture of its immersive user experiences. |
| Korrawe Karunratanakul | Business Analysis | Integrate the business problems and the technology solutions. |
| Kosate Limpongsa | Back-end Developer | Build and maintain the technology that powers a server, application, and a database. |
| Parinthorn Saithong | UX/UI Designer | Combine researching and design skills together to understand the user needs and produce concepts, solutions, and designs that people want to use. |
| Poomarin Phloyaphisut | Business Analysis | Integrate the business problems and the technology solutions. |
| Sirinthra Chantharaj | Back-end Developer | Build and maintain the technology that powers a server, application, and a database. | Thanat Jatuphattharachat | Project Coordinator | Lead the project team and coordinate the project. |

## Budget Constraints

The budget must meet the minimum requirement shown below:

| Name | Cost |
| - | - |
| Development Team Salaries | 15,000.00 x 8 = 120,000.00 baht / month |
| Testing Cost | 5,000.00 baht / month |
| Adobe Creative Cloud License | 1,500.00 baht / month |
| Cloud Server= 4 x 331.00 | 1,324.00 baht / month |
| Domain Name Registration | 271.22 baht / month |
| Online Advertisement | 3,000.00 baht / month |
| **Total** | **131,095.22 baht / month** |

From the Basic COCOMO equation, given estimated KLOC = 40KLOC and Software Project Class = Organic Mode:

- E = 2.4 × 401.05 = 119
- D = 2.5 × 1190.38 = 15.3 months ≈ 15 months

Thus, the system requires cost of 131095.22 × 15 ≈ approximately 2 million baht before the system is completed.
