class Jquery {
    constructor(selector) {
        this.el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    get data() {
        return this.el.dataset
    }

    getCoords() {
        return this.el.getBoundingClientRect()
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    find(selector) {
        return $(this.el.querySelector(selector))
    }

    findAll(selector) {
        return this.el.querySelectorAll(selector)
    }

    closest(selector) {
        return $(this.el.closest(selector))
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.el.textContent = text
        }

        return this.el.textContent.trim()
    }

    focus() {
        this.el.focus()
        return this
    }

    addClass(className) {
        this.el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.el.classList.remove(className)
        return this
    }

    css(styles = {}) {
        Object.keys(styles).forEach(style => {
            this.el.style[style] = styles[style]
        })
        return this
    }

    getStyles(styles = []) {
        return styles.reduce((res, style) => {
            res[style] = this.el.style[style]
            return res
        }, {})
    }

    attr(name, value) {
        if (value || value === '') {
            this.el.setAttribute(name, value)
            return this
        }
        return this.el.getAttribute(name)
    }
}

export function $(selector) {
    return new Jquery(selector)
}
