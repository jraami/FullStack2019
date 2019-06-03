import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
    it('only renders login screen if not logged in', () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)
        const loginDiv = component.container.querySelector('.loginForm')
        expect(loginDiv).toHaveTextContent(
            'Submit'
        )
        expect(component.container).not.toHaveTextContent('Blogs')
    })

    it('renders all blogs first', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }

        localStorage.setItem('BlogUser', JSON.stringify(user))

        const component = render(
            <App />
        )

        component.rerender(<App />)
        // component.debug()
        await waitForElement(
            () => component.container.querySelector('.blog')
        )
        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(3)

        expect(component.container).toHaveTextContent(
            'Testit on kivoja, paitsi ei'
        )
        expect(component.container).toHaveTextContent(
            'Möhkiksen Elämä, Osa 1'
        )
        expect(component.container).toHaveTextContent(
            'Sipuliinan Elämä ja Teot, kaikki osat'
        )
    })
})