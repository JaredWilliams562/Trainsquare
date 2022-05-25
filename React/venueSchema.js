import * as Yup from 'yup';

const venueSchema = Yup.object().shape({
    name: Yup.string().min(2).max(255).required('Is Required'),
    description: Yup.string().min(2).max(4000).required('Is Required'),
    url: Yup.string().min(2).max(255).required('Is Required'),
    locationId: Yup.number().min(1).required('Is Required'),
});

export default venueSchema;
