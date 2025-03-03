const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const title = await page.getByText('log in to application')
    await expect(title).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('/api/testing/reset')
      await request.post('/api/users', {
        data: {
          name: 'Root User',
          username: 'root',
          password: 'password'
        }
      })

      await page.goto('/')
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'password')

      await expect(page.getByText('logged in successfully as Root User')).toBeVisible()
      await expect(page.getByText('Root User logged in')).toBeVisible()
    })

    test('fails with invalid credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrongpassword')

      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('log in to application')).toBeVisible()
    })

    describe('is successful and', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'root', 'password')

        await expect(page.getByText('logged in successfully as Root User')).toBeVisible()
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'Test Title', 'Test Author', 'https://example.com')

        await expect(page.getByText('a new blog Test Title by Test Author added')).toBeVisible()
        await expect(page.getByText('Test Title Test Author')).toBeVisible()
      })

      describe('some blog exist, ', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'Test Title', 'Test Author', 'https://example.com')
          await expect(page.getByText('a new blog Test Title by Test Author added')).toBeVisible()
          await createBlog(page, 'Test Title 2', 'Test Author 2', 'https://example.com')
          await expect(page.getByText('a new blog Test Title 2 by Test Author 2 added')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
          await page.getByText('Test Title Test Author').getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await expect(page.getByText('1 likes')).toBeVisible()
        })

        test('a blog can be deleted if the user is its creator', async ({ page }) => {
          await page.getByText('Test Title Test Author').getByRole('button', { name: 'view' }).click()
          await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

          page.on('dialog', async (dialog) => {
            await dialog.accept()
          })
          await page.getByRole('button', { name: 'remove' }).click()

          await expect(page.getByText('Test Title Test Author')).not.toBeVisible()
        })

        test('the delete button of a blog is hidden to users that are not its creator', async ({ page, request }) => {
          await page.getByRole('button', { name: 'logout' }).click()

          await request.post('/api/users', {
            data: {
              name: 'Test User',
              username: 'test',
              password: 'password'
            }
          })
          await loginWith(page, 'test', 'password')

          await page.getByText('Test Title Test Author').getByRole('button', { name: 'view' }).click()
          await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test('the blogs are ordered by likes', async ({ page }) => {
          await page.getByText('Test Title Test Author').getByRole('button', { name: 'view' }).click()
          await page.getByText('Test Title 2 Test Author 2').getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).last().click()
          
          await expect(page.getByText('likes').first()).toContainText('1 likes')
          await expect(page.getByText('likes').last()).toContainText('0 likes')
          await expect(page.getByText('Test Title').last()).toContainText('Test Title Test Author')
        })
      })
    })
  })
})