const loginWith = async (page, username, password) => {
    await page.locator('input[name="Username"]').fill(username)
    await page.locator('input[type="password"]').fill(password)

    await page.locator('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByText('create new blog').click()

    await page.locator('input[name="Title"]').fill(title)
    await page.locator('input[name="Author"]').fill(author)
    await page.locator('input[name="Url"]').fill(url)

    await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }