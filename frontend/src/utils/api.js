class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers,
            })
            .then(this._checkError);
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: this._headers,
            })
            .then(this._checkError);
    };

    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(this._checkError);
    };

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link,
                })
            })
            .then(this._checkError);
    };

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkError);
    };

    setLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkError);
    };

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkError);
    };

    toggleLike(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            }).then(this._checkError);
        } else {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            }).then(this._checkError);
        }
    }

    editUserAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            })
        }).then(this._checkError);
    };

    _checkError(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
    headers: {
        authorization: "8f21f79f-6e9f-4a38-b93b-6b074dd058d2",
        'Content-Type': 'application/json'
    },
});

export default api;