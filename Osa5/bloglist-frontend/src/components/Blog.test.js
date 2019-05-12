import React from 'react'
import { render, fireEvent } from 'react-testing-library'
//import { prettyDOM } from 'dom-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    const blog = {
        title: 'Testit on kivoja, paitsi ei',
        author: 'Kukahan Lie',
        url: '--',
        likes: 0,
        userId: {
            name: 'Jaakko'
        }
    }

    const mockLikeHandler = jest.fn()
    const mockDeleteHandler = jest.fn()
    const { getByText } = render(
        <Blog name='testBlog' blog={blog} username={blog.userId.name} likeHandler={mockLikeHandler} deleteHandler={mockDeleteHandler} />
    )

    beforeEach(() => {
        component = render(
            <Blog name='testBlog' blog={blog} username={blog.userId.name} likeHandler={mockLikeHandler} deleteHandler={mockDeleteHandler} />
        )
    })

    it('renders the hidden content', () => {
        component.container.querySelector('.titlebar')
    })

    it('keeps the hidden content hidden until clicked', () => {
        const div = component.container.querySelector('.details')
        expect(div).toHaveStyle('display:none')
    })

    it('shows the hidden content when clicked', () => {
        const div = component.container.querySelector('.details')
        const clickableDiv = component.container.querySelector('.title')
        fireEvent.click(clickableDiv)
        expect(div).toHaveStyle('display:none')
    })

    it('shows title and author in the titlebar', () => {
        const div = component.container.querySelector('.titlebar')
        expect(div).toHaveTextContent(blog.author)
        expect(div).toHaveTextContent(blog.title)
    })

    it('shows number of likes (0)', () => {
        const div = component.container.querySelector('.details')
        expect(div).toHaveTextContent(blog.likes + ' likes')
    })

    it('reacts to click button twice', () => {
        const likeButton = getByText('Like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(mockLikeHandler.mock.calls.length).toBe(2)
    })
})

/*test('renders content', () => {

    const blog = {
        title: 'Testit on kivoja, paitsi ei',
        author: 'Kukahan Lie',
        url: '--',
        likes: 0
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )
    component.debug()
    //const li = component.container.querySelector('div')

    //console.log(prettyDOM(li))

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