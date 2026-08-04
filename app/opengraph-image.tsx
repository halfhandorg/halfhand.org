import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Halfhand — Replay Every Action Your Agents Took'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ICON_DATA_URI =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxMiIgZmlsbD0iI0VGRThEQSIvPgogIDxnPgogICAgPCEtLSBvdXRlciByaW5nIC0tPgogICAgPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJCMzU0MiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgICA8IS0tIGxlZnQgLyByaWdodCBwYW5lbHMgc3BsaXQgYnkgYSBjZW50cmFsIHNlYW0gLS0+CiAgICA8cmVjdCB4PSIxNiIgeT0iMTUiIHdpZHRoPSIxNCIgaGVpZ2h0PSIzNCIgcng9IjIiIGZpbGw9IiMyQjM1NDIiLz4KICAgIDxyZWN0IHg9IjM0IiB5PSIxNSIgd2lkdGg9IjE0IiBoZWlnaHQ9IjM0IiByeD0iMiIgZmlsbD0iIzJCMzU0MiIvPgogICAgPCEtLSBjZW50cmFsIHZlcnRpY2FsIHN0ZW0gLS0+CiAgICA8cmVjdCB4PSIzMC41IiB5PSI3IiB3aWR0aD0iMyIgaGVpZ2h0PSI1MCIgZmlsbD0iIzJCMzU0MiIvPgogICAgPCEtLSBjZW50cmFsIG5vZGUgLS0+CiAgICA8Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSI2IiBmaWxsPSIjRUZFOERBIiBzdHJva2U9IiMyQjM1NDIiIHN0cm9rZS13aWR0aD0iMyIvPgogIDwvZz4KPC9zdmc+Cg=='

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#171717',
        }}
      >
        <img
          src={ICON_DATA_URI}
          width={128}
          height={128}
          style={{ borderRadius: 24, marginBottom: 44 }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#f2f2f2',
            letterSpacing: '-0.02em',
          }}
        >
          Halfhand
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#a3a3a3',
            marginTop: 24,
          }}
        >
          Replay Every Action Your Agents Took
        </div>
      </div>
    ),
    { ...size }
  )
}
