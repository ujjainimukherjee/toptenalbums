import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

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
                            <strong>{caption}</strong> by {artist}
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
