import React, { useEffect, useState } from 'react';
import venuesServ from '../../services/venueService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as toastr from 'toastr';
import debug from 'sabio-debug';
import venueSchema from '../../schema/venueSchema';
import PropTypes from 'prop-types';
import Dropzone from '../files/Dropzone';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const _logger = debug.extend('Venue Form');

function EditForm() {
    const location = useLocation();

    const [updateVenue, setUpdateVenue] = useState({
        pageData: {
            name: '',
            description: '',
            url: '',
            imageUrl: '',
        },
    });

    _logger(updateVenue);
    useEffect(() => {
        _logger('this', location.state.aVenue);
        if (location.state.aVenue) {
            const currentVenue = location.state.aVenue;
            setUpdateVenue((prevState) => {
                const newState = { ...prevState };
                newState.pageData.description = currentVenue.description;
                newState.pageData.name = currentVenue.name;
                newState.pageData.url = currentVenue.url;
                newState.pageData.imageUrl = currentVenue.imageUrl;
                return newState;
            });
        }
    }, []);

    const uploadFileReturn = (upload) => {
        _logger(upload[0], 'was uploaded.');
        setUpdateVenue((prevState) => {
            const pd = { ...prevState };
            pd.pageData.imageUrl = upload[0].url;
            return pd;
        });
    };
    const handleEdit = (values) => {
        let data = { ...values, imageUrl: updateVenue.pageData.imageUrl };
        _logger('edit clicked', values);
        venuesServ.update(updateVenue.pageData?.id, data).then(onUpdateSuccess).catch(onUpdateError);
    };

    const onUpdateSuccess = (response) => {
        _logger(response);
        toastr.success('Venue Updated!');
    };

    const onUpdateError = (err) => {
        _logger(err);
        toastr.success('Venue Could Not Be Updated!');
    };

    return (
        <React.Fragment>
            <Card.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <h1>Edit Venue</h1>
                            <Formik
                                enableReinitialize={true}
                                initialValues={updateVenue.pageData}
                                onSubmit={handleEdit}
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
                                    <h5>Venue Image Dropzone</h5>
                                    <Dropzone uploadedFiles={uploadFileReturn} />
                                    <div />
                                    <button type="submit" className="btn btn-primary buttonspacing">
                                        Edit Venue
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

EditForm.propTypes = {
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

export default EditForm;
