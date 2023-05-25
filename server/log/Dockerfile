FROM openjdk:8
<<<<<<<< HEAD:server/user/Dockerfile
ARG JAR_FILE_PATH=build/libs/user-0.0.1-SNAPSHOT.jar
========
ARG JAR_FILE_PATH=build/libs/log-0.0.1-SNAPSHOT.jar
>>>>>>>> 7ed01e1127ec6244370aa748c1df03dc9cccf087:server/log/Dockerfile
COPY ${JAR_FILE_PATH} app.jar
EXPOSE 8000
ENTRYPOINT ["java", "-jar", "/app.jar"]
