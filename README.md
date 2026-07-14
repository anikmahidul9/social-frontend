# Social Feed Frontend

A modern social media frontend built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. This application provides a responsive user interface for interacting with the Social Feed backend, allowing users to register, log in, create posts, upload images, like content, comment, reply, and manage post visibility.

## ✨ Features

- 🔐 User Authentication (Login & Registration)
- 📰 Social Feed
- 📝 Create, Edit and Delete Posts
- 🖼️ Image Upload Support
- 🌍 Public & Private Post Visibility
- ❤️ Like & Unlike Posts
- 💬 Comment System
- ↩️ Nested Replies
- 👍 Like & Unlike Comments and Replies
- 📱 Responsive Design
- ⚡ Fast Performance with Next.js
- 🔄 REST API Integration

---

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **UI Library:** React
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Authentication:** JWT
- **Package Manager:** npm

---

## 📂 Project Structure

```text
src/
├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
├── utils/
└── styles/
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/anikmahidul9/social-frontend.git
```

```bash
cd social-frontend
```

### Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

Update the API URL according to your backend server.

---

## ▶️ Run Development Server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 📌 Application Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Posts

- Create Post
- Edit Post
- Delete Post
- Public & Private Visibility
- Image Upload

### Feed

- Latest Posts First
- Infinite Ready Structure
- Responsive Feed Layout

### Comments

- Add Comments
- Reply to Comments
- Nested Replies

### Likes

- Like/Unlike Posts
- Like/Unlike Comments
- View Users Who Liked

---

## 🔗 Backend

This frontend communicates with the Social Feed REST API developed in **Golang** using **Clean Architecture** and **PostgreSQL**.

---

## 📸 Screenshots

You can add screenshots here.

```
screenshots/
    login.png
    register.png
    feed.png
    create-post.png
```

Example:

```md
## Login

![Login](screenshots/login.png)

## Feed

![Feed](screenshots/feed.png)
```

---

## 📖 API Integration

The frontend consumes REST APIs for:

- Authentication
- Posts
- Comments
- Replies
- Likes
- Image Upload

All API requests are handled using Axios with JWT authentication.

---

## 🔒 Security

- JWT Authentication
- Protected Routes
- Form Validation
- Secure API Communication
- Input Validation

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Mahidul Anik**

- GitHub: https://github.com/anikmahidul9

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
