import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Item, Popup, Icon, Form } from 'semantic-ui-react';
import Dropdown from '../UI/FormElements/Dropdown/Dropdown';
import Button from '../UI/Buttons/Button/Button';

import classes from './Park.css';
import { bindActionCreators } from 'redux';
import { updateCurrentUser, fetchCurrentUser } from '../../store/actions/index';


class Park extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCurrentUser: false,
            hideable: false,
            showPark: true,
            numOfRatings: 0,
            totalRatingCount: 0,
            currentRating: 0
        };
    }

    componentWillMount() {
        const isHideable = parseInt(this.props.match.params.userId, 10) === this.props.currentUser.id;
        const containsUser = this.props.park.users.some(user => (user.id === this.props.currentUser.id));
        
        this.setState({
            hasCurrentUser: containsUser,
            hideable: isHideable
        })
    }

    shouldComponentUpdate = (nextProps, nextState) => this.state !== nextState || this.props.currentUser.parks !== nextProps.currentUser.parks;

    handleAddRemovePark = () => {
        this.setState({
            hasCurrentUser: !this.state.hasCurrentUser,
            showPark: this.state.hideable ? false : true
        });

        this.props.updateCurrentUser(this.props.currentUser, 'parksList', this.props.park.id);
    }

    handleRatingSubmit = () => {
        this.setState({
            numOfRatings: this.state.numOfRatings + 1,
            totalRatingCount: this.state.totalRatingCount + this.state.currentRating,
            currentRating: 0
        });
    };

    handleUpdateRating = (event, { value }) => {
        this.setState({
            currentRating: value
        });
    };

    render() {

        const isFenced = this.props.park.fenced ? "Fenced" : "Open Off Leash Area";
        const parkAddress = !this.props.park.address_2 ? `${this.props.park.address_1}` : `${this.props.park.address_1} and ${this.props.park.address_2}`;
        const hours = `${this.props.park.hours_open} A.M. to ${this.props.park.hours_close}`;
        
        let parkUserList = [...this.props.park.users].filter(user => user.id !== this.props.currentUser.id);

        if (this.state.hasCurrentUser){
            parkUserList.push(this.props.currentUser)
        } else {
            parkUserList = parkUserList.filter(user => user.id !== this.props.currentUser.id)
        }

        const userPopups = parkUserList.map(user => {
            const popupHeader = <Popup.Header>
                <Image
                    src={user.profile_image_url}
                    verticalAlign='middle'
                    circular
                />
            </Popup.Header>;

            return <Popup
                key={user.username}
                trigger={<Image src={user.profile_image_url} avatar />}
                header={popupHeader}
                content={user.username}
                className={classes.Popup}
            />;
        });


        const parkIcon = <Popup
            trigger={<Icon
                name={this.state.hasCurrentUser ? "remove circle" : "add circle"}
                onClick={this.handleAddRemovePark}
                size="large"
                color={this.state.hasCurrentUser ? "red" : "green"}
                className={classes.ParkIcon}
            />}
            content={this.state.hasCurrentUser ? `Remove ${this.props.park.name} from my favorites` : `Add ${this.props.park.name} to my favorites.`}
            basic
        />;

        const ratingDropdownOptions = [
            { key: '1', value: 1, text: '1' },
            { key: '2', value: 2, text: '2' },
            { key: '3', value: 3, text: '3' },
            { key: '4', value: 4, text: '4' },
            { key: '5', value: 5, text: '5' },

        ];

        const parkRating = (this.state.totalRatingCount / this.state.numOfRatings) || 0;
            
        let park = <Item className={classes.Content}>
            <Image className={classes.ParkImage} rounded src={this.props.park.image_url} />
            <Item.Content verticalAlign='middle'>
                {parkIcon}
                <Item.Header>{this.props.park.name} </Item.Header>
                <Item.Meta>
                    <span>{parkAddress}</span>
                </Item.Meta>
                <Item.Description>{this.props.park.description}</Item.Description>
                <Item.Extra>
                    <strong>{isFenced}</strong><br />
                    <strong>Hours:</strong>{hours}<br />
                    <strong>Visitors:</strong> {userPopups.length !== 0 ? userPopups : 'None yet. Be the first to visit!'}
                </Item.Extra>
                <Item.Extra>
                    <Form onSubmit={this.handleRatingSubmit}>
                        <Dropdown
                            type='dropdown'
                            options={ratingDropdownOptions}
                            placeholder="Leave a Rating"
                            id="ratingDropdown"
                            onChange={this.handleUpdateRating}
                            value={this.state.currentRating}
                        />
                        <Form.Button
                            content="Submit"
                        />
                    </Form>
                    {parkRating}
                </Item.Extra>
            </Item.Content>
        </Item>

        park = this.state.hideable && !this.state.showPark ? <div></div> : park;
        return park;
    };
};

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    const { selectedUser } = state.user;
    return {
        currentUser,
        selectedUser
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateCurrentUser, fetchCurrentUser }, dispatch)
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Park));
