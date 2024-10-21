# Context

Challenge for Oubuild (https://github.com/hernanvargasoutbuild/Test-Back-End-Outbuild/tree/main)

## Comments

Thanks for the opportunitty. In general, the process and challenge may not seem that complex, but if you want to implement best practices and patterns, it can growth very easily, and the challenge it self was very open for what you can build. So I hope the solution showcases my skills regardless I didn't implement all of the best practices and patterns I know and use, since it's just a test.

With that being said, here are some considerations for the solution.

### Assumptions

- For a schedule, Name, ImageURL, and associated user are mandatory
- I added an endpoint to create a user, just for the workflows

### Considerations

- Since it’s a simple/test App, I follow a pretty common and standard folder structure but no patterns where apply like DDD or Hexagonal Architecture, Entities, Mappers, DTO, and others
- No framework used (I normally use NestJS)
- No typescript
- No deepen or more complex validations added, only stake at the required regardless it was evident they are needed (for example, it was implemented only that a user can't view a schedule they don't own, but they could add activities to a schedule they do not own)
- Very open CORS policy
- No authentication and Authorization mechanism apply (I stock with basic/raw validations as requiered in the problem statement)
- No advance logging implement, just enough to meet the problem statement and showcase the skills (for example Snapshot of request, Responses, Response time, or different log levels other than INFO).
- Didn't add any reusable helpers/components/functions so you DRY, for example validations added only for getting activiites, same should be done for Adding activities.
- No docker file included, but I have good skills on this as well.
- Documentation using openAPI (swagger) with out a direct integration and using AI Tools to generate the file. I normally work with frameworks like NestJS that has this built-in, or other libraries like JDocs.
- Testing is basic, just validating the response messages/status code, not the data it self because it will requiere to mock the data, generate test data, and other additional work that would extend the task (I added a /seed enpoint to highilight the needs). The test included cover a workflow of seed the database, get the userId, create a schedule, and add a activity to the schedule, just to showcase the logic and sills, knowing there is still a lot of more scenarios to test.
- Regarding optimization and best practices, I didn't go deeper on other options like using PATCH methos instead of PUT. I stick only with POST/GET methods for the excersice, but I am familiar with this practices.
- To showcase the possible data optimizations, as an example I did the following refactorization
    ```javascript
    const newActivity = await prisma.activity.create({
      data: {
        name,
        startDate,
        endDate,
        scheduleId: parseInt(scheduleId),
      },
    });
    ```
    ```javascript
    const newActivity = await prisma.activity.create({
      data: {
        name,
        startDate,
        endDate,
        scheduleId: parseInt(scheduleId),
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
      },
    });
    ````
- Used Prisma as the ORM instead of direct actions against the database. To keep it simple I just use int as the ID instead of uuid.
- No "advance" script was added to package.json to start the project
- No semantic commits and other best practices where used

## Project Start

1. Rename the file .env.example to .env and fill in the postgres database url, name the database "outbuild" or update the database url.
2. Run the command "npm install"
3. The firs time run the command "npx prisma migrate dev"
4. Run the command "npm start" to start the application on http://localhost:3000
5. To run the test, run "npm test"