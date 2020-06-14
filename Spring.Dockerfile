FROM openjdk:8-jdk-alpine
WORKDIR /spring
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} ./spring.jar
ENTRYPOINT ["java", "-Dspring.data.mongodb.uri=mongodb://mongodb:27017/test", "-jar", "spring.jar"]
