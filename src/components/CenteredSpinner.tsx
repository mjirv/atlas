import { Container, Spinner } from '@chakra-ui/react'

const CenteredSpinner = () => (
  <Container
    height="100%"
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Spinner size="xl" />
  </Container>
)

export default CenteredSpinner
