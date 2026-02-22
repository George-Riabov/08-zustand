import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: George Riabov</p>
          <p>
            Contact us:{" "}
            <a href="mailto:george.riabov3105@gmail.com">
              george.riabov3105@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
