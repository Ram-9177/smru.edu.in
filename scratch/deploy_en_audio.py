import os
import shutil

src_dir = "/Users/ram/Desktop/Campus Tour - SMRU/src/Audio/English"
dest_dir = "/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/audio/en/common"

# Ensure destination exists
os.makedirs(dest_dir, exist_ok=True)

# Mapping from source filenames to destination slugs used in guide.json
mapping = {
    "Main Entrance and Campus Overview.mp3": "entry-gate-combined.mp3",
    "A One Block.mp3": "a-one-block.mp3",
    "Hostel Block.mp3": "hostel-block-ground.mp3",
    "Main Block..mp3": "main-block.mp3",
    "Rent a Bike Facility.mp3": "electric-bikes.mp3",
    "Canteen area.mp3": "student-cafeteria.mp3",
    "Multi-Disciplinary Play and Fitness Complex.mp3": "play-fitness-complex.mp3",
    "Central Library.mp3": "central-library.mp3",
    "A T M Facility.mp3": "atm-facility.mp3",
    "Cricket Ground, Gymnasium, and Indoor Games.mp3": "cricket-ground.mp3",
    "University Block.mp3": "university-block.mp3",
    "M B A and Law Block.mp3": "mba-law-block.mp3",
    "Rehab Block and Hospital.mp3": "rehab-block.mp3",
    "Sensory Park.mp3": "sensory-park.mp3",
    "Swimming Pool.mp3": "swimming-pool.mp3",
    "Amphitheatre.mp3": "amphitheatre.mp3",
    "Sign Off.mp3": "signing-off.mp3"
}

for src_name, dest_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied and renamed: {src_name} -> {dest_name}")
    else:
        print(f"Warning: Source file not found: {src_path}")

print("English audio clips have been deployed to the public folder.")
