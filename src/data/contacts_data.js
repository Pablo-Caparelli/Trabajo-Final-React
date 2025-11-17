const contacts = [
    {
        id: 1,
        user_id: 1,
        name: 'Pepito',
        profile_picture: 'https://i.etsystatic.com/52946191/r/il/20ab0d/6269485703/il_794xN.6269485703_jno8.jpg',
        last_connection: 'hoy 14:50',
        is_connected: false,
        messages: [
            {
                id: 1,
                content: 'Hola que tal',
                author_id: 1,
                author_name: "pepe",
                created_at: 'Hoy',
                status: 'VIEWED'
            }
        ]
  },
  {
        id: 2,
        user_id: 2,
        name: 'Juancito',
        profile_picture: 'https://i.etsystatic.com/52946191/r/il/20ab0d/6269485703/il_794xN.6269485703_jno8.jpg',
        last_connection: 'hoy 16:50',
        is_connected: false,
        messages: [
            {
                id: 2,
                content: 'Todo bien',
                author_id: 2,
                author_name: "pepe",
                created_at: 'Hoy',
                status: 'VIEWED'
            }
        ]
  }
]

export default contacts