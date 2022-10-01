import { Flex, Spinner } from '@chakra-ui/react'

const CenteredSpinner = () => (
  <Flex
    alignSelf="stretch"
    justifySelf="stretch"
    alignItems="center"
    justifyItems="center"
    alignContent="center"
    justifyContent="center"
    flex="1"
  >
    <Spinner size="xl" />
  </Flex>
)

export default CenteredSpinner
