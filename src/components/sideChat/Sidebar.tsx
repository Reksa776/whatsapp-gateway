export default function Sidebar({ contacts, active, onSelect }) {
  function formatTime(ts) {
    if (!ts) return "";
    let date;
    // kalau timestamp dalam detik, kalikan 1000
    if (typeof ts === "number" && ts.toString().length === 10) {
      date = new Date(ts * 1000);
    } else {
      date = new Date(ts);
    }

    // kalau hari ini → jam menit
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // kalau beda hari → tampil tanggal
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
  }

  return (
    <div className="w-1/4 border-r border-gray-300 bg-white">
      <div className="p-3 font-semibold border-b">Daftar Pesan</div>
      {contacts.map((c) => {
        const lastTimestamp = c.lastTimestamp || c?.lastMessage?.timestamp;

        return (
          <div
            key={c.jid}
            onClick={() => onSelect(c.jid)}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
              active === c.jid ? "bg-gray-100" : ""
            }`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Info Kontak */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <div
                  className={`font-medium truncate ${
                    c.unread ? "font-bold" : ""
                  }`}
                >
                  {c.name}
                </div>
                {lastTimestamp && (
                  <div className="text-xs text-gray-500 ml-2">
                    {formatTime(lastTimestamp)}
                  </div>
                )}
              </div>

              <div
                className={`text-sm truncate ${
                  c.unread ? "font-bold text-black" : "text-gray-500"
                }`}
              >
                {c.lastText}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
