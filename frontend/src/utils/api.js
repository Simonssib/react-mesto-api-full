class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    };

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            })
            .then(this._checkError);
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            })
            .then(this._checkError);
    };

    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                credentials: 'include',
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
                credentials: 'include',
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
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkError);
    };

    setLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkError);
    };

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkError);
    };

    toggleLike(id, isLiked) {
        if (isLiked) {
            return this.setLike(id);
        } else {
            return this.removeLike(id);
        }
    };

    editUserAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
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
    baseUrl: "http://api.simonmesto.students.nomoredomains.icu",
    headers: {
        'Content-Type': 'application/json'
    },
});

export default api;