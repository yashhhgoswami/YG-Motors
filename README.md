<div align="center">

# 🚗 YG MOTORS – Premium Automotive Experience Frontend

"Precision | Performance | Prestige"

Modern React application delivering a luxury automotive dealership experience: curated inventory, loan applications, trade‑in processing, test drive bookings, client dashboards, and admin operations – all powered by Firebase.

</div>

---

## ✨ Features

- Hero landing with cinematic video & animated inventory preview
- Dynamic vehicle inventory showcase
- Secure client authentication (Firebase Auth)
- Loan application workflow with progressive multi‑step form
- Trade‑In valuation form with user authentication gating
- Test drive booking (client + admin management)
- Centralized success / auth modals & notifications
- User dashboard (applications, orders, trade‑ins, status)
- Admin dashboard (loan apps, orders, trade‑ins, test drives, messages)
- Firestore persistence for all submissions
- Responsive, dark premium design language

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19, React Router 7 |
| Styling | Modular CSS (per page/component) |
| State/Auth | Firebase Auth |
| Data | Firebase Firestore |
| Tooling | Create React App (React Scripts) |
| Testing | React Testing Library, Jest DOM |

## 🗂️ Proposed Project Structure (Refactor Plan)

We will reorganize for clarity, scalability, and separation of concerns. Current flat `src/` will be refactored into:

```
src/
	App.js
	index.js
	styles/                # Global / shared base styles
		App.css
		index.css
	config/                # Firebase & runtime config
		firebaseConfig.js
	data/
		carData.js
	assets/
		images/              # (moved from assets/*)
		video/
		fonts/
	components/
		layout/
			Navbar.jsx
			Footer.jsx
		ui/
			Modal/
				Modal.jsx
				Modal.css
			Notification/
				Notification.jsx
				Notification.css
			VehicleDetailsModal/
				VehicleDetailsModal.jsx
				VehicleDetailsModal.css
	pages/
		About/
			AboutPage.jsx
			AboutPage.css
		Contact/
			ContactPage.jsx
			ContactPage.css
		Inventory/
			InventoryPage.jsx
			InventoryPage.css
		LoanApplication/
			LoanApplicationPage.jsx
			LoanApplicationPage.css
		TradeIn/
			TradeInPage.jsx
			TradeInPage.css
		TestDrive/
			TestDrivePage.jsx
			TestDrivePage.css
		Order/
			OrderPage.jsx
			OrderPage.css
		Auth/
			LoginPage.jsx
			LoginPage.css
			SignUpPage.jsx
			SignUpPage.css
		Profile/
			UserDashboard.jsx
			UserDashboard.css
			CreateProfilePage.jsx
			CreateProfilePage.css
			ApplicationStatusPage.jsx
			ApplicationStatusPage.css
		Admin/
			AdminDashboard.jsx
			LoanApplicationsAdminPage.jsx
			OrdersAdminPage.jsx
			TradeInAdminPage.jsx
			MessagesAdminPage.jsx
			# each with its own CSS if needed
```

After confirmation, imports in `App.js` will be updated and redundant top‑level CSS imports removed (pages already scope their own styles). Fonts will be colocated under `assets/fonts` and loaded via `@font-face` in a global stylesheet.

## 🔧 Environment Setup

1. Clone repository
2. Install dependencies:
	 ```bash
	 npm install
	 ```
3. Create a Firebase project and enable:
	 - Authentication (Email/Password)
	 - Firestore Database
4. Create `.env.local` (already git‑ignored) with:
	 ```bash
	 REACT_APP_FIREBASE_API_KEY=YOUR_KEY
	 REACT_APP_FIREBASE_AUTH_DOMAIN=...
	 REACT_APP_FIREBASE_PROJECT_ID=...
	 REACT_APP_FIREBASE_STORAGE_BUCKET=...
	 REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
	 REACT_APP_FIREBASE_APP_ID=...
	 ```
5. Start development server:
	 ```bash
	 npm start
	 ```

## 🧪 Testing

Run test watcher:
```bash
npm test
```
Add component tests under `src/__tests__/` or colocated with `.test.js` suffix. Example targets: form validation, modal rendering, route guards.

## 🚀 Build & Deploy

Create production build:
```bash
npm run build
```
Deploy options:
- Static hosting (Firebase Hosting, Netlify, Vercel)
- Behind CDN for asset optimization

## 🛡️ Security & Privacy

- Client-side only; do not store secrets in repo.
- Firestore security rules should restrict access per `userId` for user-owned documents and limit admin collections to privileged accounts.
- Sanitize and validate all user inputs before writing to Firestore (server rules + client constraints).

## 🗺️ Roadmap Ideas

- Global design tokens (colors, spacing, typography) via CSS variables
- Dark/light theme toggle
- Pagination / filtering for inventory
- Image optimization & lazy loading
- Form field masking (SSN, phone) & stronger validation
- Role-based route guards abstraction
- Automated visual regression snapshots

## 🤝 Contributing

1. Fork & branch: `feat/your-feature`
2. Keep PRs small & focused
3. Add/maintain tests where logic changes
4. Follow existing code style (ESLint config)

## 📸 Screenshots (Add Later)

| Landing | Dashboard | Admin |
|---------|----------|-------|
| (hero)  | (user)   | (admin) |

## 📄 License

Consider adding an OSS license (e.g. MIT) if you intend public reuse.

## 🙌 Acknowledgements

- Firebase for backend services
- React community & open‑source ecosystem

---

### ✅ Next Refactor Step (Action Required)
Please confirm that you would like me to proceed with physically moving files into the proposed structure. This will involve updating many import paths. Once you approve, I will:

1. Create the directories
2. Move each page & component
3. Update all imports in `App.js` and any cross‑component references
4. Introduce a `styles/fonts.css` (if fonts are used) and consolidate font loading
5. Run a quick build to verify everything compiles

Let me know: proceed with the restructuring? (Yes/No)

---

Made with passion for performance. 🏁
