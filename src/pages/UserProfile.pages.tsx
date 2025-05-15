import { RootState } from "@/store/store";
import { Button, Fieldset, Flex, Image, TextInput, Title } from "@mantine/core";
import { useSelector } from "react-redux";

export function UserProfile() {
    const user = useSelector((state:RootState) => state.userSlice.user);

    return(
        <Flex mt={20} direction='column' align='center' gap={20}>
            <Title>User Profile</Title>

            <Flex justify='center' >
                <form>
                    <Flex gap={10} direction='column' w='70%' m='auto'>
                        <Fieldset legend='Name'>
                            <Flex gap={10}>
                                <TextInput
                                    label='First'
                                    value={user?.name.first}
                                    disabled
                                />

                                <TextInput
                                    label='Middle'
                                    value={user?.name.middle}
                                    disabled
                                />

                                <TextInput
                                    label='Last'
                                    value={user?.name.last}
                                    disabled
                                /> 
                            </Flex>
                        </Fieldset>

                        <Fieldset legend='Address'>
                            <Flex gap={10}>
                                <TextInput
                                    label='Country'
                                    value={user?.address.country}
                                    disabled
                                />

                                <TextInput
                                    label='State'
                                    value={user?.address.state}
                                    disabled
                                />

                                <TextInput
                                    label='City'
                                    value={user?.address.city}
                                    disabled
                                />

                                <TextInput
                                    label='Street'
                                    value={user?.address.street}
                                    disabled
                                />

                                <TextInput
                                    label='House'
                                    value={user?.address.houseNumber}
                                    disabled
                                />

                                <TextInput
                                    label='Zipcode'
                                    value={user?.address.zip}
                                    disabled
                                />
                            </Flex>
                        </Fieldset>

                        <Fieldset>
                            <TextInput
                                    label='Email'
                                    value={user?.email}
                                    disabled
                            />

                            <TextInput
                                    label='Password'
                                    value={user?.password}
                                    disabled
                            />

                            <TextInput
                                    label='Phone'
                                    value={user?.phone}
                                    disabled
                            />

                            <TextInput
                                    label='User Since'
                                    value={user?.createdAt}
                                    disabled
                            />

                            <Image
                                src={user?.image?.url}
                                h={100}
                                w={100}
                                alt={user?.image?.alt}
                            />
                        </Fieldset>

                        {!user?.isBusiness && <Button>Become a Business User</Button>}
                    </Flex>
                </form>
            </Flex>
        </Flex>
    )
}