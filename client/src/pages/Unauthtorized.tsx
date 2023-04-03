const Unauthtorized: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <a
        href="http://localhost:3000/login/auth"
        className="rounded-2xl bg-bgButton px-4 py-2 text-3xl text-iconColor transition-all duration-300 hover:rounded-sm hover:text-white"
      >
        Login with GitHub
      </a>
    </div>
  )
}

export default Unauthtorized
