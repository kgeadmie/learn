import code, asyncio, os
from pyscript import fs, window, ffi

_terminal = __terminal__ # type: ignore

await fs.mount('/fs-con', mode='readwrite')

async def _sync(*args):
    fs.sync('/fs-con')
def sync():
    asyncio.run(_sync())

os.chdir('/fs-con')
print(os.getcwd())

def _resize_terminal(event=None):
    if '__terminal__' in locals() or '__terminal__' in globals():
        width = window.innerWidth
        height = window.innerHeight
        cols = int(width / 10)
        rows = int(height / 20)
        
        _terminal.resize(cols, rows)

_resize_terminal()
window.addEventListener("resize", ffi.create_proxy(_resize_terminal))

code.interact(local=locals())
