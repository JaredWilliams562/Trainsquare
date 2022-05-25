import React, { useEffect, useState } from 'react';
import venuesServ from '../../services/venueService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import toastr from '../../utils/toastr';
import debug from 'sabio-debug';
import venueSchema from '../../schema/venueSchema';
import PropTypes from 'prop-types';
import Dropzone from '../files/Dropzone';
import { Card } from 'react-bootstrap';

const _logger = debug.extend('Venue Form');

function VenueForm() {
    const [state, setState] = useState({
        pageData: {
            name: '',
            description: '',
            locationId: 249,
            url: '',
            imageUrl: '',
        },
    });
    const uploadFileReturn = (upload) => {
        _logger(upload[0], 'was uploaded.');
        setState((prevState) => {
            const pd = { ...prevState };
            pd.pageData.imageUrl = upload[0].url;
            return pd;
        });
    };
    const handleSubmit = (values) => {
        let data = { ...values, imageUrl: state.pageData.imageUrl };
        venuesServ.create(data).then(onAddVenueSuccess).catch(onAddVenueError);
        _logger('submit clicked', values);
    };

    const onAddVenueSuccess = (response) => {
        _logger(response);
        toastr.success('Venue Added!');
    };

    const onAddVenueError = (error) => {
        _logger(error);
        toastr.error('Venue could not be created.');
    };

    useEffect(() => {
        _logger('useEffect', state);
    }, [state]);

    return (
        <React.Fragment>
            <Card.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <h1>Register Your Venue</h1>
                            <Formik
                                enableReinitialize={true}
                                initialValues={state.pageData}
                                onSubmit={handleSubmit}
                                validationSchema={venueSchema}>
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">Venue Name</label>
                                        <Field type="text" name="name" className="form-control" />
                                        <ErrorMessage name="name" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Venue Description</label>
                                        <Field component="textarea" name="description" className="form-control" />
                                        <ErrorMessage name="description" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="url">Url</label>
                                        <Field type="text" name="url" className="form-control" />
                                        <ErrorMessage name="url" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imageUrl">Upload Image files Here</label>
                                        <Dropzone uploadedFiles={uploadFileReturn} name="imageUrl" />
                                    </div>
                                    <button type="submit" className="btn btn-primary buttonspacing">
                                        Register a Venue
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </React.Fragment>
    );
}

VenueForm.propTypes = {
    venue: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        locationId: PropTypes.number,
        createdBy: PropTypes.number,
        modifiedBy: PropTypes.number,
        imageUrl: PropTypes.string,
    }),
};

export default VenueForm;
