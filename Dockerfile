FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src src/
RUN apk add --no-cache maven && mvn package -DskipTests -q

FROM eclipse-temurin:17-jre-alpine
RUN apk add --no-cache python3 nodejs gcc g++ musl-dev
WORKDIR /app
COPY --from=build /app/target/codearena-classconnect-1.0.0.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
