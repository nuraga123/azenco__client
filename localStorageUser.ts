export const getLocalStorageUser = () => {
  const userIdStorage = (localStorage.getItem('userId') as string) || ''
  const usernameStorage = (localStorage.getItem('username') as string) || ''
  const emailStorage = (localStorage.getItem('email') as string) || ''
  const tokenStorage = (localStorage.getItem('token') as string) || ''

  return {
    userIdStorage,
    usernameStorage,
    emailStorage,
    tokenStorage,
  }
}

export const removeLocalStorageUser = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
  localStorage.removeItem('token')
}
