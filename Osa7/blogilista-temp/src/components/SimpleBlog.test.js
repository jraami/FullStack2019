import React from 'react'
import { render, fireEvent } from 'react-testing-library'
//import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
    const blog = {
        title: 'Testit on kivoja, paitsi ei',
        author: 'Kukahan Lie',
        url: '--',
        likes: 0
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )
    // component.debug()

    expect(component.container).toHaveTextContent(
        'Testit on kivoja, paitsi ei'
    )
})
test('clicking like increases by one', () => {
    const blog = {
        title: 'Testit on kivoja, paitsi ei',
        author: 'Kukahan Lie',
        url: '--',
        likes: 0
    }

    const mockHandler = jest.fn()
    const { getByText } = render(
        <SimpleBlog blog={blog} clickLike={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(1)
})






/*
describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Testit on kivoja, paitsi ei',
            author: 'Kukahan Lie',
            url: '--',
            likes: 0
        }

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const titleDiv = blogComponent.find('.title')
        const authorDiv = blogComponent.find('.author')
        const urlDiv = blogComponent.find('.url')
        const likesDiv = blogComponent.find('.likes')

        expect(titleDiv.text()).toContain(blog.title)
        expect(authorDiv.text()).toContain(blog.author)
        expect(urlDiv.text()).toContain(blog.url)
        expect(likesDiv.text()).toContain(blog.likes)
    })

    it('clicking the button calls event handler twice', () => {
        const blog = {
            title: 'Testit on kivoja, paitsi ei',
            author: 'Kukahan Lie',
            url: '--',
            likes: 0
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                clickLike={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(1)
    })
})
*/