export default function ({
  $route,
  store,
  redirect
}) {
  // If the user is not authenticated
  if (!store.state.admin && ['create'].includes($route.name)) {
    throw ({
      statusCode: 404,
      message: 'Post not found'
    })
  }
}
