import MsgType from "./msg-type";

export default `
window.PresentationCreator = class {
  id = 0
  calls = new Map()

  constructor() {
    window.addEventListener('rn-web-bridge', this._processMsg)
  }

  destroy() {
    window.removeEventListener('rn-web-bridge', this._processMsg)
  }

  async create(args) {
    return this._rpc('${MsgType.PresentationCreate}', args)
  }

  _rpc(type, args) {
    let id = this.id++

    // TODO: add timeout
    return new Promise((resolve, reject) => {
      this.calls.set(id, {resolve, reject})

      let msg = {type, data: {id, args}}
      this._emit(msg)
    })
  }

  _emit(msg) {
    window.ReactNativeWebView.postMessage(JSON.stringify(msg))
  }

  _processMsg = e => {
    let data = e.detail?.data
    if (!data) return
    
    let {id, res, err} = data

    let {resolve, reject} = this.calls.get(id) || {}
    if (!resolve) return

    this.calls.delete(id)

    if (err) {
      return reject(new Error(err))
    }

    resolve(res)
  }
}

// usage example
/*
let pc = window.PresentationCreator && new window.PresentationCreator()

let getPres = async () => { 
  let pres = await pc?.create({
    attributes: ['credentialSubject.nationalNumber'],
  })
  alert(JSON.stringify(pres))
}

getPres()
*/
`;
