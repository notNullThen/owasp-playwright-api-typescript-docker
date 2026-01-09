import { expect, test } from "../global-setup";

test("User can register successfully", async ({ createdUser }) => {
  const payloadData = createdUser.payload;
  const responseData = createdUser.response.data;

  expect(createdUser.response.status, "User registration should be successful").toBe("success");

  expect(responseData.id, "Security question ID should be valid").toBeGreaterThan(0);

  expect(responseData.email.toLowerCase(), "Registered email should match the input email").toBe(
    payloadData.email.toLowerCase()
  );

  expect(responseData.isActive, "IsActive should be true for a newly registered user").toBe(true);

  await test.step("Nulls and Empty checks", async () => {
    expect(responseData.createdAt, "CreatedAt should not be null or whitespace").not.toBeNull();
    expect(responseData.createdAt.toString().trim().length).toBeGreaterThan(0);

    expect(responseData.deletedAt, "DeletedAt should be null or empty").toBeNull();
    expect(responseData.lastLoginIp, "LastLoginIp should not be null or whitespace").not.toBeNull();
    expect(responseData.lastLoginIp.trim().length).toBeGreaterThan(0);

    expect(responseData.profileImage, "ProfileImage should not be null or whitespace").not.toBeNull();
    expect(responseData.profileImage.trim().length).toBeGreaterThan(0);

    expect(responseData.role, "Role should not be null or whitespace").not.toBeNull();
    expect(responseData.role.trim().length).toBeGreaterThan(0);

    expect(responseData.updatedAt, "UpdatedAt should not be null or whitespace").not.toBeNull();
    expect(responseData.updatedAt.toString().trim().length).toBeGreaterThan(0);
  });
});
