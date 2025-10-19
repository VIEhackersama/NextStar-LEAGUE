# Stage 1: build (optional) - nếumuốn build trong Docker (multi-stage)
#FROM maven:3.8.7-eclipse-temurin-17 AS build
#WORKDIR /workspace
#COPY pom.xml .
#COPY src ./src
#RUN mvn -B -DskipTests package

# Stage 2: runtime
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
# Nếuđã build jar ở host: COPY target/*.jar app.jar
# Nếudùng multi-stage: COPY --from=build /workspace/target/*.jar app.jar
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]