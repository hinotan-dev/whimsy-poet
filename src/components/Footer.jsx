export default function Footer() {
  return (
    <footer>
      <p>
        Made with ♥️ by Ellen Zheng&nbsp;
        <br className="hide-tablet-up" />
        &copy; WhimsyPoet, {new Date().getFullYear()}.&nbsp;
        <br className="hide-tablet-up" />
        Illustrations generated using AI tools.
      </p>
    </footer>
  )
}