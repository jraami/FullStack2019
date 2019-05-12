const blogs = [
    {
        id: '5a451df7571c224a31b5c8ce',
        title: 'Testit on kivoja, paitsi ei',
        author: 'Kukahan Lie',
        url: '--',
        likes: 0,
        userId: {
            _id: '5a437a9e514ab7f168ddf138',
            username: 'Antti',
            name: 'Möhkö Fantti'
        }
    },
    {
        id: '5a451e21e0b8b04a45638211',
        title: 'Möhkiksen Elämä, Osa 1',
        author: 'Möhkis',
        url: '--',
        likes: 0,
        userId: {
            _id: '5a437a9e514ab7f168ddf138',
            username: 'Antti',
            name: 'Möhkö Fantti'
        }
    },
    {
        id: '5a451e30b5ffd44a58fa79ab',
        title: 'Sipuliinan Elämä ja Teot, kaikki osat',
        author: 'Sipuliina Bibuli',
        url: '--',
        likes: 0,
        userId: {
            _id: '5ccdae31c13a8004a423f079',
            username: 'sipuliina',
            name: 'Sibuli X'
        }
    }
]

const getAll = () => {
    console.log('returning all blogs')
    return Promise.resolve(blogs)
}

let token = null

const setToken = (newToken) => {
    console.log('set token')
    token = `bearer ${newToken}`
}

export default { getAll, setToken }