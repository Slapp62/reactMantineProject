// import { useEffect, useState } from 'react';
// import { joiResolver } from '@hookform/resolvers/joi';
// import axios from 'axios';
// import { FieldValues, useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useDisclosure, useMediaQuery } from '@mantine/hooks';
// import { RootState } from '@/store/store';
// import { clearUser, setUser, updateUser } from '@/store/authSlice';
// import { TUser } from '@/Types';
// import { editProfileSchema } from '@/validationRules/editProfile.joi';
// import { useCurrentUser } from '@/utils/reduxHelperHooks';

// export const useEditProfile = () => {
//   const jumpTo = useNavigate();
//   const { id } = useParams();
//   const isMobile = useMediaQuery('(max-width: 700px)');
//   const [isDisabled, setDisabled] = useState(true);
//   const dispatch = useDispatch();
//   const [isSubmitting, setSubmitting] = useState(false);
//   const [opened, { open, close }] = useDisclosure(false);

//   const isAdminView = useSelector((state: RootState) => state.userSlice.isAdminView);
//   const currentUser = useCurrentUser();
//   const allUsers = useSelector((state: RootState) => state.userSlice.allUsers);
//   const paramsUser = allUsers?.find((account) => account._id === id);

//   const userData = isAdminView ? paramsUser : currentUser;

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isValid, isDirty },
//     trigger,
//   } = useForm<TUser>({
//     mode: 'all',
//     resolver: joiResolver(editProfileSchema),
//     defaultValues: userData ? cleanedUserData(userData) : {},
//   });

//   useEffect(() => {
//     if (userData) {
//       const defaultUserValues = cleanedUserData(userData);
//       reset(defaultUserValues);
//     }
//   }, [reset, userData]);

//   const onSubmit = async (data: FieldValues) => {
//     if (!data.password) {
//       delete data.password;
//     }
//     data.address.houseNumber = Number(data.address.houseNumber);
//     data.address.zip = Number(data.address.zip);
//     try {
//       const response = await axios.put(
//         `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData?._id}`,
//         data
//       );

//       if (response.status === 200) {
//         const updatedUser = response.data;

//         // if not admin view, update the current user information
//         if (!isAdminView) {
//           dispatch(setUser(updatedUser));
//         }

//         // if it is admin view, update the selected user information
//         if (isAdminView) {
//           dispatch(updateUser(updatedUser));
//         }
//         reset(cleanedUserData(updatedUser));
//         setDisabled(true);
//         toast.success('Profile Updated Successfully!', { position: `bottom-right` });
//       }
//     } catch (error: any) {
//       toast.error(`Update Failed! ${error.response.data}`, { position: `bottom-right` });
//     }
//   };

//   const updateBusinessStatus = async () => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     axios.defaults.headers.common['x-auth-token'] = token;
//     try {
//       const response = await axios.patch(
//         `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData?._id}`
//       );
//       if (response.status === 200) {
//         const updatedUser = response.data;
//         setSubmitting(true);
//         setTimeout(() => {
//           // if not admin view, update the current user information
//           if (!isAdminView) {
//             dispatch(setUser(updatedUser));
//           }
//           // if it is admin view, update the selected user information
//           if (isAdminView) {
//             dispatch(updateUser(updatedUser));
//           }
//           toast.success('Account Status Updated');
//           setSubmitting(false);
//         }, 2000);
//       }
//     } catch (error: any) {
//       toast.error(`Account Status Update Failed! ${error.response.data}`, {
//         position: `bottom-right`,
//       });
//       if (error.response) {
//         toast.error(`Account Status Update Failed! ${error.response.data}`, {
//           position: `bottom-right`,
//         });
//       }
//     }
//   };

//   const deleteUser = async () => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     axios.defaults.headers.common['x-auth-token'] = token;
//     try {
//       const response = await axios.delete(
//         `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData?._id}`
//       );
//       if (response.status === 200) {
//         !isAdminView ? dispatch(clearUser()) : jumpTo('/admin');
//         toast.warning('Account Deleted.', { position: 'bottom-right' });
//       }
//     } catch (error: any) {
//       toast.error(`Account Deletion Failed! ${error.response.data}`, {
//         position: `bottom-right`,
//       });
//     }
//   };

//   return {
//     isSubmitting,
//     isAdminView,
//     userData,
//     register,
//     handleSubmit,
//     onSubmit,
//     trigger,
//     errors,
//     isDirty,
//     isValid,
//     isDisabled,
//     setDisabled,
//     updateBusinessStatus,
//     isMobile,
//     opened,
//     open,
//     close,
//     deleteUser,
//   };
// };
