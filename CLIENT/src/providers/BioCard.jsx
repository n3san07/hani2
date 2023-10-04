import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';

export default function BioCard({ name, aboutme, phone, img }) {
    return (
        <Card
            sx={{
                width: 200,
                maxWidth: '100%',
                boxShadow: 'xl',
            }}
        >
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Avatar src={img} sx={{ '--Avatar-size': '4rem' }} />
                <Chip
                    size="sm"
                >
                </Chip>
                <Typography level="title-lg">{name}</Typography>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    {aboutme}
                </Typography>

            </CardContent>
            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                        <Button>
                            <a
                                href={`https://api.whatsapp.com/send?phone=${phone}`}
                            >
                                whatsapp
                            </a>

                        </Button>
                        <Button>
                            <a href={`tel:${phone}`}>
                                call now
                            </a>

                        </Button>
                    </ButtonGroup>
                </CardActions>
            </CardOverflow>
        </Card>
    );
}