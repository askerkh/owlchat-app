const Unauthtorized: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <a
        href="https://owlchat-api.onrender.com/login/auth"
        className="rounded-2xl bg-bgButton px-4 py-2 text-3xl text-iconColor transition-all duration-300 hover:rounded-sm hover:text-white"
      >
        Login with GitHub
      </a>
    </div>
  )
}

export default Unauthtorized
