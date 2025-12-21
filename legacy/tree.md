bjorn@bjorn-home-desktop:~/Code/ggf/love-ledger$ tree
.
├── docs
│   ├── conversations
│   │   ├── 00-gemini-app-recommendations.md
│   │   └── 01-deepseek-ninja-design.md
│   └── hearts-categories-system.md
├── LICENSE
├── package.json
├── package-lock.json
├── packages
│   ├── api
│   │   ├── examples
│   │   │   └── egp-integration.js
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── hearts.js
│   │   │   ├── index.js
│   │   │   └── server.js
│   │   └── test-love-ledger.js
│   └── web
│       ├── drizzle
│       │   ├── 0000_volatile_lionheart.sql
│       │   └── meta
│       │       ├── 0000_snapshot.json
│       │       └── _journal.json
│       ├── drizzle.config.ts
│       ├── e2e
│       │   └── demo.test.ts
│       ├── eslint.config.js
│       ├── node_modules
│       │   ├── detect-libc
│       │   │   ├── index.d.ts
│       │   │   ├── lib
│       │   │   │   ├── detect-libc.js
│       │   │   │   ├── filesystem.js
│       │   │   │   └── process.js
│       │   │   ├── LICENSE
│       │   │   ├── package.json
│       │   │   └── README.md
│       │   ├── @libsql
│       │   │   ├── client
│       │   │   │   ├── lib-cjs
│       │   │   │   │   ├── hrana.js
│       │   │   │   │   ├── http.js
│       │   │   │   │   ├── migrations.js
│       │   │   │   │   ├── node.js
│       │   │   │   │   ├── package.json
│       │   │   │   │   ├── sql_cache.js
│       │   │   │   │   ├── sqlite3.js
│       │   │   │   │   ├── web.js
│       │   │   │   │   └── ws.js
│       │   │   │   ├── lib-esm
│       │   │   │   │   ├── hrana.d.ts
│       │   │   │   │   ├── hrana.js
│       │   │   │   │   ├── http.d.ts
│       │   │   │   │   ├── http.js
│       │   │   │   │   ├── migrations.d.ts
│       │   │   │   │   ├── migrations.js
│       │   │   │   │   ├── node.d.ts
│       │   │   │   │   ├── node.js
│       │   │   │   │   ├── sql_cache.d.ts
│       │   │   │   │   ├── sql_cache.js
│       │   │   │   │   ├── sqlite3.d.ts
│       │   │   │   │   ├── sqlite3.js
│       │   │   │   │   ├── web.d.ts
│       │   │   │   │   ├── web.js
│       │   │   │   │   ├── ws.d.ts
│       │   │   │   │   └── ws.js
│       │   │   │   ├── package.json
│       │   │   │   └── README.md
│       │   │   ├── core
│       │   │   │   ├── lib-cjs
│       │   │   │   │   ├── api.js
│       │   │   │   │   ├── config.js
│       │   │   │   │   ├── package.json
│       │   │   │   │   ├── uri.js
│       │   │   │   │   └── util.js
│       │   │   │   ├── lib-esm
│       │   │   │   │   ├── api.d.ts
│       │   │   │   │   ├── api.js
│       │   │   │   │   ├── config.d.ts
│       │   │   │   │   ├── config.js
│       │   │   │   │   ├── uri.d.ts
│       │   │   │   │   ├── uri.js
│       │   │   │   │   ├── util.d.ts
│       │   │   │   │   └── util.js
│       │   │   │   └── package.json
│       │   │   ├── hrana-client
│       │   │   │   ├── lib-cjs
│       │   │   │   │   ├── batch.js
│       │   │   │   │   ├── byte_queue.js
│       │   │   │   │   ├── client.js
│       │   │   │   │   ├── cursor.js
│       │   │   │   │   ├── describe.js
│       │   │   │   │   ├── encoding
│       │   │   │   │   │   ├── index.js
│       │   │   │   │   │   ├── json
│       │   │   │   │   │   │   ├── decode.js
│       │   │   │   │   │   │   └── encode.js
│       │   │   │   │   │   └── protobuf
│       │   │   │   │   │       ├── decode.js
│       │   │   │   │   │       ├── encode.js
│       │   │   │   │   │       └── util.js
│       │   │   │   │   ├── errors.js
│       │   │   │   │   ├── http
│       │   │   │   │   │   ├── client.js
│       │   │   │   │   │   ├── cursor.js
│       │   │   │   │   │   ├── json_decode.js
│       │   │   │   │   │   ├── json_encode.js
│       │   │   │   │   │   ├── protobuf_decode.js
│       │   │   │   │   │   ├── protobuf_encode.js
│       │   │   │   │   │   ├── proto.js
│       │   │   │   │   │   └── stream.js
│       │   │   │   │   ├── id_alloc.js
│       │   │   │   │   ├── index.js
│       │   │   │   │   ├── libsql_url.js
│       │   │   │   │   ├── package.json
│       │   │   │   │   ├── queue.js
│       │   │   │   │   ├── queue_microtask.js
│       │   │   │   │   ├── result.js
│       │   │   │   │   ├── shared
│       │   │   │   │   │   ├── json_decode.js
│       │   │   │   │   │   ├── json_encode.js
│       │   │   │   │   │   ├── protobuf_decode.js
│       │   │   │   │   │   ├── protobuf_encode.js
│       │   │   │   │   │   └── proto.js
│       │   │   │   │   ├── sql.js
│       │   │   │   │   ├── stmt.js
│       │   │   │   │   ├── stream.js
│       │   │   │   │   ├── util.js
│       │   │   │   │   ├── value.js
│       │   │   │   │   └── ws
│       │   │   │   │       ├── client.js
│       │   │   │   │       ├── cursor.js
│       │   │   │   │       ├── json_decode.js
│       │   │   │   │       ├── json_encode.js
│       │   │   │   │       ├── protobuf_decode.js
│       │   │   │   │       ├── protobuf_encode.js
│       │   │   │   │       ├── proto.js
│       │   │   │   │       └── stream.js
│       │   │   │   ├── lib-esm
│       │   │   │   │   ├── batch.d.ts
│       │   │   │   │   ├── batch.js
│       │   │   │   │   ├── byte_queue.d.ts
│       │   │   │   │   ├── byte_queue.js
│       │   │   │   │   ├── client.d.ts
│       │   │   │   │   ├── client.js
│       │   │   │   │   ├── cursor.d.ts
│       │   │   │   │   ├── cursor.js
│       │   │   │   │   ├── describe.d.ts
│       │   │   │   │   ├── describe.js
│       │   │   │   │   ├── encoding
│       │   │   │   │   │   ├── index.d.ts
│       │   │   │   │   │   ├── index.js
│       │   │   │   │   │   ├── json
│       │   │   │   │   │   │   ├── decode.d.ts
│       │   │   │   │   │   │   ├── decode.js
│       │   │   │   │   │   │   ├── encode.d.ts
│       │   │   │   │   │   │   └── encode.js
│       │   │   │   │   │   └── protobuf
│       │   │   │   │   │       ├── decode.d.ts
│       │   │   │   │   │       ├── decode.js
│       │   │   │   │   │       ├── encode.d.ts
│       │   │   │   │   │       ├── encode.js
│       │   │   │   │   │       ├── util.d.ts
│       │   │   │   │   │       └── util.js
│       │   │   │   │   ├── errors.d.ts
│       │   │   │   │   ├── errors.js
│       │   │   │   │   ├── http
│       │   │   │   │   │   ├── client.d.ts
│       │   │   │   │   │   ├── client.js
│       │   │   │   │   │   ├── cursor.d.ts
│       │   │   │   │   │   ├── cursor.js
│       │   │   │   │   │   ├── json_decode.d.ts
│       │   │   │   │   │   ├── json_decode.js
│       │   │   │   │   │   ├── json_encode.d.ts
│       │   │   │   │   │   ├── json_encode.js
│       │   │   │   │   │   ├── protobuf_decode.d.ts
│       │   │   │   │   │   ├── protobuf_decode.js
│       │   │   │   │   │   ├── protobuf_encode.d.ts
│       │   │   │   │   │   ├── protobuf_encode.js
│       │   │   │   │   │   ├── proto.d.ts
│       │   │   │   │   │   ├── proto.js
│       │   │   │   │   │   ├── stream.d.ts
│       │   │   │   │   │   └── stream.js
│       │   │   │   │   ├── id_alloc.d.ts
│       │   │   │   │   ├── id_alloc.js
│       │   │   │   │   ├── index.d.ts
│       │   │   │   │   ├── index.js
│       │   │   │   │   ├── libsql_url.d.ts
│       │   │   │   │   ├── libsql_url.js
│       │   │   │   │   ├── queue.d.ts
│       │   │   │   │   ├── queue.js
│       │   │   │   │   ├── queue_microtask.d.ts
│       │   │   │   │   ├── queue_microtask.js
│       │   │   │   │   ├── result.d.ts
│       │   │   │   │   ├── result.js
│       │   │   │   │   ├── shared
│       │   │   │   │   │   ├── json_decode.d.ts
│       │   │   │   │   │   ├── json_decode.js
│       │   │   │   │   │   ├── json_encode.d.ts
│       │   │   │   │   │   ├── json_encode.js
│       │   │   │   │   │   ├── protobuf_decode.d.ts
│       │   │   │   │   │   ├── protobuf_decode.js
│       │   │   │   │   │   ├── protobuf_encode.d.ts
│       │   │   │   │   │   ├── protobuf_encode.js
│       │   │   │   │   │   ├── proto.d.ts
│       │   │   │   │   │   └── proto.js
│       │   │   │   │   ├── sql.d.ts
│       │   │   │   │   ├── sql.js
│       │   │   │   │   ├── stmt.d.ts
│       │   │   │   │   ├── stmt.js
│       │   │   │   │   ├── stream.d.ts
│       │   │   │   │   ├── stream.js
│       │   │   │   │   ├── util.d.ts
│       │   │   │   │   ├── util.js
│       │   │   │   │   ├── value.d.ts
│       │   │   │   │   ├── value.js
│       │   │   │   │   └── ws
│       │   │   │   │       ├── client.d.ts
│       │   │   │   │       ├── client.js
│       │   │   │   │       ├── cursor.d.ts
│       │   │   │   │       ├── cursor.js
│       │   │   │   │       ├── json_decode.d.ts
│       │   │   │   │       ├── json_decode.js
│       │   │   │   │       ├── json_encode.d.ts
│       │   │   │   │       ├── json_encode.js
│       │   │   │   │       ├── protobuf_decode.d.ts
│       │   │   │   │       ├── protobuf_decode.js
│       │   │   │   │       ├── protobuf_encode.d.ts
│       │   │   │   │       ├── protobuf_encode.js
│       │   │   │   │       ├── proto.d.ts
│       │   │   │   │       ├── proto.js
│       │   │   │   │       ├── stream.d.ts
│       │   │   │   │       └── stream.js
│       │   │   │   ├── LICENSE
│       │   │   │   ├── package.json
│       │   │   │   └── README.md
│       │   │   ├── isomorphic-fetch
│       │   │   │   ├── index.d.ts
│       │   │   │   ├── node.cjs
│       │   │   │   ├── node.js
│       │   │   │   ├── package.json
│       │   │   │   ├── README.md
│       │   │   │   ├── web.cjs
│       │   │   │   └── web.js
│       │   │   ├── linux-x64-gnu
│       │   │   │   ├── index.node
│       │   │   │   ├── package.json
│       │   │   │   └── README.md
│       │   │   └── linux-x64-musl
│       │   │       ├── index.node
│       │   │       ├── package.json
│       │   │       └── README.md
│       │   └── libsql
│       │       ├── index.js
│       │       ├── LICENSE
│       │       ├── package.json
│       │       ├── promise.js
│       │       ├── README.md
│       │       ├── sqlite-error.js
│       │       └── types
│       │           ├── index.d.ts
│       │           └── promise.d.ts
│       ├── package.json
│       ├── playwright.config.ts
│       ├── postcss.config.js
│       ├── project.inlang
│       │   ├── cache
│       │   │   └── plugins
│       │   │       ├── 283bd0tvvivv7
│       │   │       └── 3fhvg7lmyjji3
│       │   ├── project_id
│       │   └── settings.json
│       ├── sqlite.db
│       ├── sqlite.db-shm
│       ├── sqlite.db-wal
│       ├── src
│       │   ├── app.css
│       │   ├── app.d.ts
│       │   ├── app.html
│       │   ├── demo.spec.ts
│       │   ├── hooks.server.ts
│       │   ├── hooks.ts
│       │   ├── lib
│       │   │   ├── auth
│       │   │   │   ├── lucia.ts
│       │   │   │   ├── password.ts
│       │   │   │   └── validation.ts
│       │   │   ├── components
│       │   │   │   ├── CareActCard.svelte
│       │   │   │   ├── ColorShiftingHeart.svelte
│       │   │   │   ├── HeartsBadge.svelte
│       │   │   │   ├── LanguageSwitcher.svelte
│       │   │   │   ├── Layout.svelte
│       │   │   │   └── ThemeToggle.svelte
│       │   │   ├── db
│       │   │   │   ├── connection.ts
│       │   │   │   ├── queries.ts
│       │   │   │   └── schema.ts
│       │   │   ├── i18n
│       │   │   │   ├── en
│       │   │   │   │   ├── about.json
│       │   │   │   │   ├── auth.json
│       │   │   │   │   ├── common.json
│       │   │   │   │   ├── contact.json
│       │   │   │   │   ├── dashboard.json
│       │   │   │   │   ├── home.json
│       │   │   │   │   └── privacy.json
│       │   │   │   ├── index.js
│       │   │   │   └── sv
│       │   │   │       ├── about.json
│       │   │   │       ├── auth.json
│       │   │   │       ├── common.json
│       │   │   │       ├── contact.json
│       │   │   │       ├── dashboard.json
│       │   │   │       ├── home.json
│       │   │   │       └── privacy.json
│       │   │   ├── index.ts
│       │   │   ├── server
│       │   │   │   └── db
│       │   │   │       ├── index.ts
│       │   │   │       └── schema.ts
│       │   │   └── utils
│       │   │       └── markdown.js
│       │   ├── routes
│       │   │   ├── about
│       │   │   │   └── +page.svelte
│       │   │   ├── auth
│       │   │   │   ├── login
│       │   │   │   │   ├── +page.server.ts
│       │   │   │   │   └── +page.svelte
│       │   │   │   ├── logout
│       │   │   │   │   └── +page.server.ts
│       │   │   │   └── register
│       │   │   │       ├── +page.server.ts
│       │   │   │       └── +page.svelte
│       │   │   ├── contact
│       │   │   │   └── +page.svelte
│       │   │   ├── dashboard
│       │   │   │   ├── +page.server.ts
│       │   │   │   └── +page.svelte
│       │   │   ├── +layout.server.ts
│       │   │   ├── +layout.svelte
│       │   │   ├── +page.server.ts
│       │   │   ├── +page.svelte
│       │   │   └── privacy
│       │   │       └── +page.svelte
│       │   └── stories
│       │       ├── assets
│       │       │   ├── accessibility.png
│       │       │   ├── accessibility.svg
│       │       │   ├── addon-library.png
│       │       │   ├── assets.png
│       │       │   ├── avif-test-image.avif
│       │       │   ├── context.png
│       │       │   ├── discord.svg
│       │       │   ├── docs.png
│       │       │   ├── figma-plugin.png
│       │       │   ├── github.svg
│       │       │   ├── share.png
│       │       │   ├── styling.png
│       │       │   ├── testing.png
│       │       │   ├── theming.png
│       │       │   ├── tutorials.svg
│       │       │   └── youtube.svg
│       │       ├── button.css
│       │       ├── Button.stories.svelte
│       │       ├── Button.svelte
│       │       ├── Configure.mdx
│       │       ├── header.css
│       │       ├── Header.stories.svelte
│       │       ├── Header.svelte
│       │       ├── page.css
│       │       ├── Page.stories.svelte
│       │       └── Page.svelte
│       ├── static
│       │   └── favicon.svg
│       ├── svelte.config.js
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── vitest-setup-client.ts
└── README.md


