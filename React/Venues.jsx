import React, { useState, useCallback, useEffect } from 'react';
import venuesServ from '../../services/venueService';
import VenueCard from './VenueCard';
import { Link, useNavigate } from 'react-router-dom';
import debug from 'sabio-debug';
import * as toastr from 'toastr';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const _logger = debug.extend('Venue');

const Venues = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(5);
    const [venueData, setVenueData] = useState({
        venues: [],
        venuesComponents: [],
        isShown: false,
    });

    _logger(venueData);

    const mapVenue = (aVenue) => {
        return <VenueCard venue={aVenue} key={aVenue.id} onDeleteClicked={onDeleteRequested} editHandle={editHandle} />;
    };

    useEffect(() => {
        _logger('useEffect is firing');
        callVenues();
    }, [currentPage]);

    const callVenues = () => {
        venuesServ.getAllPaginated(currentPage, pageSize).then(onGetVenuesSuccess).catch(onGetVenuesError);
    };

    const onGetVenuesSuccess = (response) => {
        let pd = response.item;
        let venues = pd.pagedItems;
        _logger('get all success', response);

        setVenueData((prevState) => {
            return { ...prevState, venues: venues, venuesComponents: venues.map(mapVenue) };
        });
    };

    const onGetVenuesError = (err) => {
        _logger(err);
    };

    const onDeleteRequested = useCallback((aVenue, eObj) => {
        _logger(aVenue.id, eObj);
        const handler = onDeleteVenueSuccess(aVenue);
        venuesServ.deleteById(aVenue.id).then(handler).catch(onDeleteVenueError);
    }, []);

    const onDeleteVenueSuccess = (aVenue) => {
        _logger('onDeleteSuccess', aVenue.id);
        callVenues();

        toastr.success(`${aVenue.name} has been deleted.`);
    };

    const onDeleteVenueError = (err) => {
        _logger('Could not delete', err);
    };

    const editHandle = (aVenue) => {
        _logger('venues edit handle running', aVenue);
        const stateForTransport = { aVenue };
        navigate(`/venues/edit/${aVenue.id}`, { state: stateForTransport });
    };

    const handleClickPage = (data) => {
        _logger(data.selected);
        setCurrentPage(data.selected);
        callVenues();
    };

    return (
        <React.Fragment>
            <div className="row">
                <div>
                    <div>
                        <Link to="/venues/add">
                            <button className="link-btn btn btn-success buttonspacing" href="#">
                                Register a Venue
                            </button>
                        </Link>
                    </div>
                </div>
                <div>{venueData.venues.map(mapVenue)}</div>
            </div>

            <div className="row page-data">
                {venueData.isShown && venueData.venuesComponents}
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={10}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={2}
                    onPageChange={handleClickPage}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </React.Fragment>
    );
};

Venues.propTypes = {
    venue: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        locationId: PropTypes.number,
        imageUrl: PropTypes.string,
    }),
    onDeleteClicked: PropTypes.func.isRequired,
    findIndex: PropTypes.func.isRequired,
};

export default Venues;
