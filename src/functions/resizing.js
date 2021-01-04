import {$} from './Jquery'

export function resizing(event, root) {
    return new Promise(resolve => {
        const resizer = $(event.target)
        const parent = resizer.closest('[data-type="resizable"]')
        const type = resizer.data.resize
        const coords = parent.getCoords()
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let value

        resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })

        document.onmousemove = e => {
            if (type === 'row') {
                const delta = e.pageY - coords.bottom
                value = coords.height + delta
                resizer.css({bottom: - delta + 'px'})
            } else {
                const delta = e.pageX - coords.right
                value = coords.width + delta
                resizer.css({right: - delta + 'px'})
            }
        }
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            if (type === 'row') {
                parent.css({height: value + 'px'})
            } else {
                $(root).findAll(`[data-col="${parent.data.col}"]`)
                    .forEach(el => el.style.width = value + 'px')
            }

            resolve({
                value,
                type,
                id: parent.data[type]
            })

            resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    })
}