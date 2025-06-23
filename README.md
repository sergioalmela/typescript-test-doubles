# TypeScript Test Doubles Examples

A comprehensive educational repository demonstrating the five classic test double patterns in TypeScript with realistic examples.

## What are Test Doubles?

Test doubles are objects that replace real dependencies in tests. They help isolate the system under test (SUT) and make tests faster, more reliable, and easier to control.

## The Five Test Double Types

### 1. **Dummy** - Required but Ignored
A dummy object is passed around but never actually used. It exists only to satisfy parameter lists.

**When to use:** When the SUT requires a dependency but never calls it meaningfully.

**Example:** `DummyLogger` - satisfies the Logger interface but does nothing.

```typescript
// The service requires a logger but never uses it meaningfully
const articlePublisher = new ArticlePublisher(
  articleRepository, 
  DummyLogger, // Dummy - required but irrelevant
  notificationService
)
```

### 2. **Fake** - Working but Lightweight
A fake object has a working implementation but takes shortcuts (e.g., in-memory storage instead of a database).

**When to use:** When you need the dependency to work but want it to be fast and simple.

**Example:** `ArticleRepositoryFake` - fully functional but stores data in memory.

```typescript
// Fake repository works like the real one but is fast and simple
const fakeRepository = new ArticleRepositoryFake()
const service = new ArticlePublisher(fakeRepository, logger)

const article = await service.publish({
  authorId: 'author-123',
  title: 'My First Article',
  content: 'This is the content of my first article.'
})
const saved = fakeRepository.getSavedArticleById(article.id) // Actually retrieves the article
```

### 3. **Stub** - Returns Predefined Data
A stub provides canned answers to calls made during the test, usually not responding at all to anything outside what's programmed for the test.

**When to use:** When you need the dependency to return specific data regardless of input.

**Example:** `UserRepositoryStub` - always returns the same user regardless of the ID requested.

```typescript
// Stub always returns the same user, ignoring input
const stubbedUser = User.create({ name: 'Stubbed User', email: 'stub@example.com' })
const stubRepository = new UserRepositoryStub(stubbedUser)

const result = await service.updateUserEmail('any-id', 'new@example.com')
expect(result).toBe(stubbedUser) // Always returns the stubbed user
```

### 4. **Spy** - Records Calls for Later Inspection
A spy is a stub that also records information about how it was called, such as the number of times it was called, the arguments it was called with, etc.

**When to use:** When you want to verify that the SUT interacted with the dependency correctly.

**Example:** `NotificationServiceSpy` - records notification calls for verification.

```typescript
// Spy records behavior for verification
const notificationSpy = new NotificationServiceSpy()
const service = new ArticlePublisher(repository, logger, notificationSpy)

await service.publish({
  authorId: 'author-456',
  title: 'Article with Notification',
  content: 'This article should trigger a notification.'
})

// Verify the spy recorded the expected behavior
expect(notificationSpy.wasNotifiedOfArticlePublication('author-456', 'Article with Notification')).toBe(true)
expect(notificationSpy.totalNotificationsSent).toBe(1)
```

### 5. **Mock** - Pre-programmed with Expectations
A mock object pre-programmed with expectations that form a specification of the calls they are expected to receive.

**When to use:** When you want to enforce strict contracts about how the SUT should interact with dependencies.

**Example:** `CommentServiceMock` - fails the test if not called exactly as expected.

```typescript
// Mock enforces exact expectations
const commentMock = new CommentServiceMock()
const articleId = ArticleId.create()
const userId = UserId.create()
const commentContent = 'This is a comment on the article.'

// Set up expectations
commentMock.expectAddComment(articleId, userId, commentContent)

// Perform the action
await commentMock.addComment(articleId, userId, commentContent)

// Mock verification fails if expectations weren't met exactly
commentMock.verify()
```

## Project Structure

```
src/
├── article/           # Article domain
├── user/             # User domain  
├── services/         # Application services
└── utils/            # Utilities

test/
├── doubles/          # Test double implementations
│   ├── dummy/        # Dummy objects
│   ├── fake/         # Fake implementations
│   ├── stub/         # Stub implementations
│   ├── spy/          # Spy implementations
│   └── mock/         # Mock implementations
└── scenarios/        # Test scenarios demonstrating each double
```

## Services and Test Scenarios

### ArticlePublisher Service
Demonstrates publishing articles with optional notifications using:
- **Dummy**: `DummyLogger` for logging (required but unused meaningfully)
- **Fake**: `ArticleRepositoryFake` for in-memory article storage
- **Spy**: `NotificationServiceSpy` to verify notification behavior

```typescript
// Example from ArticlePublisher.test.ts
const articlePublisher = new ArticlePublisher(
  new ArticleRepositoryFake(), // Fake - working implementation
  DummyLogger,                 // Dummy - required but ignored
  new NotificationServiceSpy() // Spy - records calls for verification
)
```

### UserService
Demonstrates user management operations using:
- **Dummy**: `DummyLogger` for logging
- **Stub**: `UserRepositoryStub` for returning predefined user data
- **Spy**: `NotificationServiceSpy` to verify email change notifications

```typescript
// Example from UserService.test.ts
const userService = new UserService(
  new UserRepositoryStub(existingUser), // Stub - returns predefined data
  new NotificationServiceSpy(),         // Spy - records notification calls
  DummyLogger                           // Dummy - required but ignored
)
```

### CommentService Mock Testing
Demonstrates strict contract verification using:
- **Mock**: `CommentServiceMock` to enforce exact call expectations

```typescript
// Example from CommentService.test.ts
const commentMock = new CommentServiceMock()
commentMock.expectAddComment(articleId, userId, commentContent)
await commentMock.addComment(articleId, userId, commentContent)
commentMock.verify() // Fails if expectations weren't met exactly
```

## Running the Tests

This project uses Vitest for testing. To run the tests:

```bash
npm install
npm test
```

## Key Differences Summary

| Double Type | Purpose | Verification Focus |
|-------------|---------|-------------------|
| **Dummy** | Satisfy interface requirements | None - behavior is irrelevant |
| **Fake** | Provide working implementation | Verify the fake works correctly |
| **Stub** | Return predetermined data | Verify the stub returns expected data |
| **Spy** | Record behavior for inspection | Verify the SUT behaved correctly |
| **Mock** | Enforce strict expectations | Verify the SUT followed the contract exactly |

## Best Practices

1. **Choose the right double for the job:**
   - Use dummies when the dependency is required but unused
   - Use fakes when you need working behavior but want it simple
   - Use stubs when you need specific return values
   - Use spies when you want to verify behavior occurred
   - Use mocks when you want to enforce strict contracts

2. **Keep doubles simple:** They should be easy to understand and maintain.

3. **Test the behavior, not the implementation:** Focus on what the SUT does, not how it does it.

4. **Use descriptive names:** Make it clear what each double is for.

5. **Document expectations:** Especially for mocks, make it clear what you expect.

## Contributing

This is an educational project. Feel free to:
- Add more examples
- Improve documentation
- Suggest better patterns
- Report issues
