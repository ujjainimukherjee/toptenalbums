import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Thumbnail = ({ imageUrl, caption, href, as, artist }) => {
    return (
        <div className="thumbnail">
            <Link href={href} as={as}>
                <a>
                    <figure className="item">
                        <img
                            src={imageUrl}
                            alt="Album Image"
                            className="thumbnail__image"
                        />
                        <figcaption className="thumbnail__caption">
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>{caption}</strong>
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                {artist}
                            </Typography>
                        </figcaption>
                    </figure>
                </a>
            </Link>
        </div>
    );
};

Thumbnail.propTypes = {
    imageUrl: PropTypes.string,
    caption: PropTypes.string,
    href: PropTypes.string,
    as: PropTypes.string,
    artist: PropTypes.string,
};

export default Thumbnail;
