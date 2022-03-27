import { ArrowBack, Delete, Favorite, FavoriteBorder, FavoriteOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  CardActionArea,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FavoriteContext, FavoriteContextProvider } from "../context/FavoriteContext";

const Property = ({ property, setOpenDetail }) => {
  const [state, dispatch] = useContext(FavoriteContext);
  const favorites = state.favorites;

  const addToFavorites = (property) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: uuidv4(),
        agency: property.agency.agency_name,
        agencyLogo: property.agency.agency_logo,
        price: property.price_value,
        address: property.display_address,
        photos: property.photos,
        description: property.short_description,
        propertyId: property.property_id,
        displayPrice: property.price,
      },
    });
  };

  const removeFavorite = (propertyId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        propertyId,
      },
    });
  };

  return (
    <>
      <Card sx={{ maxWidth: 300, marginBottom: 1 }} key={uuidv4()}>
        <CardActionArea sx={{ height: 350, display: "flex", alignItems: "flex-start", flexWrap: "wrap" }} onClick={() => setOpenDetail(true)}>
          <CardMedia component="img" image={"http://mr0.homeflow.co.uk/" + property.photos[0]} sx={{ height: "55%" }} />
          <CardContent sx={{ height: "100%", width: "100%" }}>
            <Typography gutterBottom variant="h6" component="div">
              {property.price}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {property.display_address}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
          {favorites.some((el) => el.propertyId == property.property_id) ? (
            <IconButton onClick={() => removeFavorite(property.property_id)}>
              <Favorite />
            </IconButton>
          ) : (
            <IconButton onClick={() => addToFavorites(property)}>
              <FavoriteBorder />
            </IconButton>
          )}
        </Box>
      </Card>
    </>
  );
};

const Filters = (props) => {
  const {
    setPrimaryChannel,
    setBedrooms,
    setMaxPrice,
    setMinPrice,
    primaryChannel,
    bedrooms,
    maxPrice,
    minPrice,
    setShowFavorites,
    showFavorites,
    setProperties,
  } = props;

  return (
    <Box sx={{ marginBottom: 1, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
      <Box>
        <TextField
          id="search"
          variant="outlined"
          placeholder="Search by location..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              getSetProperties(e.target.value, setProperties);
            }
          }}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField variant="outlined" select value={primaryChannel} onChange={(e) => setPrimaryChannel(e.target.value)}>
          <MenuItem key={uuidv4()} value="sales">
            For sale
          </MenuItem>
          <MenuItem key={uuidv4()} value="lettings">
            To rent
          </MenuItem>
        </TextField>
        <TextField
          variant="outlined"
          value={minPrice}
          label="Min Price"
          onChange={(e) => setMinPrice(e.target.value)}
          type="number"
          sx={{ width: "100px", marginLeft: 1 }}
        />
        <TextField
          variant="outlined"
          value={maxPrice}
          label="Max Price"
          onChange={(e) => setMaxPrice(e.target.value)}
          type="number"
          sx={{ width: "100px", marginLeft: 1 }}
        />
        <TextField
          variant="outlined"
          value={bedrooms}
          label="Bedrooms"
          onChange={(e) => setBedrooms(e.target.value)}
          type="number"
          sx={{ width: "80px", marginLeft: 1 }}
        />
        <Button
          startIcon={<FavoriteOutlined />}
          variant="contained"
          sx={{ height: "100%", marginLeft: 1 }}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          Favorites
        </Button>
      </Box>
    </Box>
  );
};

const FavoritesView = ({ closeFavorites }) => {
  const [state, dispatch] = useContext(FavoriteContext);
  const favorites = state.favorites;
  const filtered = favorites.filter((el) => el.id != 0);

  const removeFavorite = (propertyId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        propertyId,
      },
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <Button startIcon={<ArrowBack />} onClick={closeFavorites}>
          Go back
        </Button>
      </Grid>
      {filtered.length > 0 ? (
        filtered.map((el) => (
          <Grid item xs={12} sm={4} md={3}>
            <Card sx={{ maxWidth: 300, marginBottom: 1 }} key={uuidv4()}>
              <CardActionArea sx={{ height: 350, display: "flex", alignItems: "flex-start", flexWrap: "wrap" }}>
                <CardMedia component="img" image={"http://mr0.homeflow.co.uk/" + el.photos[0]} sx={{ height: "55%" }} />
                <CardContent sx={{ height: "100%", width: "100%" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {el.displayPrice}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {el.address}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
                <IconButton onClick={() => removeFavorite(el.propertyId)}>
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          No favorites yet...
        </Grid>
      )}
    </>
  );
};

const PropertyDetailed = ({ property, open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Property</DialogTitle>
      <DialogContent>Not implemented yet 😢</DialogContent>
    </Dialog>
  );
};

async function getSetProperties(query, setProperties) {
  const location = query != undefined && query != "" ? query : "brighton";
  const response = await fetch(`/api/properties?location=${location}`).then((data) => data.json());
  const properties = response.result.properties.elements;
  setProperties(properties);
}

export default function App() {
  const [properties, setProperties] = useState("");
  const [primaryChannel, setPrimaryChannel] = useState("sales");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  const [bedrooms, setBedrooms] = useState(0);

  const [showFavorites, setShowFavorites] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  useEffect(() => {
    getSetProperties("", setProperties);
  }, []);

  return (
    <FavoriteContextProvider>
      <Container>
        {properties.length > 0 ? (
          <Grid container spacing={2}>
            {showFavorites ? (
              <FavoritesView closeFavorites={() => setShowFavorites(!showFavorites)} />
            ) : (
              <>
                <Grid item xs={12}>
                  <Filters
                    setPrimaryChannel={setPrimaryChannel}
                    primaryChannel={primaryChannel}
                    setMinPrice={setMinPrice}
                    minPrice={minPrice}
                    setMaxPrice={setMaxPrice}
                    maxPrice={maxPrice}
                    setBedrooms={setBedrooms}
                    bedrooms={bedrooms}
                    setShowFavorites={setShowFavorites}
                    showFavorites={showFavorites}
                    setProperties={setProperties}
                  />
                </Grid>
                {properties
                  .filter(
                    (property) =>
                      property.primary_channel == primaryChannel &&
                      property.price_value >= minPrice &&
                      property.price_value <= maxPrice &&
                      property.bedrooms >= bedrooms
                  )
                  .map((property) => (
                    <Grid item xs={12} sm={4} md={3}>
                      <Property property={property} setOpenDetail={setOpenDetail} />
                    </Grid>
                  ))}
              </>
            )}
          </Grid>
        ) : (
          "Loading..."
        )}
      </Container>
      <PropertyDetailed open={openDetail} handleClose={() => setOpenDetail(false)} />
    </FavoriteContextProvider>
  );
}
