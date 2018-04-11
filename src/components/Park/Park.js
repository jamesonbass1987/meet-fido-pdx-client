import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Item, Popup, Icon } from 'semantic-ui-react';

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
