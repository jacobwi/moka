# Welcome to MokaSuite 🚀

MokaSuite is a comprehensive ecosystem comprising `MokaServices` for the backend and `MokaFrontBrew` for the frontend. Designed with flexibility in mind, it supports a range of applications from bookmarking to password management, with the infrastructure to expand further. Our goal is to cater to both self-hosters and cloud-based applications, ensuring adaptability and scalability.

## MokaServices ☕ - Backend Microservices

MokaServices is the backbone of our suite, built on a microservices architecture that emphasizes scalability, resilience, and modular growth. Each microservice is designed to perform its function optimally while seamlessly integrating with the broader ecosystem.

## MokaServices - Microservices Architecture

Below is the architectural diagram for MokaServices, outlining the interaction between different services, data flow, and other key architectural elements:

![MokaServices Architecture Diagram](docs/Services/Design/ArchitectureDesign.png)

This diagram provides a visual representation of how each microservice within MokaServices is designed to work in conjunction with others, ensuring scalability, resilience, and modularity of the entire ecosystem.

### Tech Stack & Architecture:

- **.NET 8**: Our microservices are crafted with the latest .NET framework, ensuring performance and robustness.
- **ASP.NET Core**: For building high-performance web APIs.
- **Entity Framework Core**: Serving as our ORM for database interactions, providing a seamless data access layer.
- **SQL Server & MongoDB**: A blend of SQL and NoSQL databases, catering to the diverse data storage needs of our services.
- **Docker & Kubernetes**: Containerization and orchestration support for deploying our services in varied environments.
- **RabbitMQ + Azure Service Bus**: For reliable message brokering between services, ensuring decoupled communication and scalability.
- **Ocelot API Gateway**: Unifies our service endpoints, providing a single entry point to the frontend, simplifying API consumption.

### Microservices Overview:

- **Authentication Service**: Manages user authentication, leveraging JWT for secure token generation.
- **Bookmarking Service**: Handles bookmark storage and organization, optimized for quick retrieval and management.
- **Password Manager Service**: Secures user passwords, implementing encryption standards for data safety.

...with the flexibility to introduce additional services as the suite evolves.

### 📚 Documentation:

While our initial docs are in raw files, we're transitioning to VitePress to offer a more interactive and comprehensive documentation experience.

## MokaFrontBrew 🌿 - Frontend Applications

MokaFrontBrew brings our services to the users with a series of React-based applications housed in a monorepo. Designed for scalability, each app interfaces seamlessly with its corresponding microservice, ensuring a cohesive user experience.

### Development Ecosystem:

- **React & TypeScript**: Our choice for building user interfaces with type safety and modern JS features.
- **Vite**: A modern build tool that provides a fast and efficient development experience.
- **Monorepo Structure**: Facilitates shared dependencies and streamlined cross-app development.

### Testing Frameworks 🧪

- **Vitest**: For efficient unit and integration testing within our React monorepo.
- **XUnit**: The testing framework for our .NET microservices, ensuring back-end reliability.
- **Playwright**: Conducts end-to-end tests across our applications, validating the user experience.

We adopt **BDD (Behavior-Driven Development)** to bridge the gap between technical and non-technical stakeholders, ensuring our features meet user expectations.

## Getting Started 🌟

Dive into MokaSuite, whether for self-hosting or cloud deployment. Check our `docs` for setup guides and start your journey with a suite designed for the future.

## Docker Swarm Deployment 🐳

**_Remember this is 'develop' branch. It might not be production ready._**

Deploy MokaServices on Docker Swarm with these commands:

```bash
# Initialize Docker Swarm (on manager node)
docker swarm init --advertise-addr <MANAGER-IP>

# Join the swarm (on worker nodes)
docker swarm join --token <SWARM-TOKEN> <MANAGER-IP>:2377

# Deploy MokaServices stack
docker stack deploy -c docker-compose.services.yml mokaservices
# Or for AIO
docker stack deploy -c docker-compose.aio.yml mokaservices-aio

# View running services
docker service ls

# Scale a service
docker service scale mokaservices_<SERVICE-NAME>=<REPLICAS>

# Remove the stack
docker stack rm mokaservices
# Or for AIO
docker stack rm mokaservices-aio

# Leave the swarm (on worker nodes)
docker swarm leave
# On manager node
docker swarm leave --force
```

Replace placeholders like `<MANAGER-IP>`, `<SWARM-TOKEN>`, `<SERVICE-NAME>`, and `<REPLICAS>` with your actual data.

## Contributing 🤝

WIP

```
Join the MokaSuite community! Your contributions, from features to bug fixes or docs enhancements, are invaluable. Check `CONTRIBUTING.md` for how to get started.
```

## License ⚖️

MokaSuite is proudly open-source, available under the MIT License. See `LICENSE` for more details.
