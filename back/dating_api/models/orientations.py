from enum import Enum

from .sexs import Sexs

class Orientations():
    class TargetSex(Enum):
        SAME = 0
        OPPOSITE = 1
        ALL = 2
    class TargetOrientation(Enum):
        HETERO = 0
        HOMO = 1
        OTHER = 2
        ALL = 3

    # "heterosexual" should stay first, "homosexual" second and "other" last, see hardoded indices below (0, 1, -1)
    available = {
        "heterosexual": {
            "accepted": ["straight", "hetero", "hétéro", "heterosexual", "heterosexuel", "hétérosexuel", "hétérosexuelle", "heterosexuelle"],
            "target_sex": TargetSex.OPPOSITE,
            "target_orientation": TargetOrientation.HETERO,
        },
        "homosexual": {
            "accepted": ["homosexual", "homosexuel", "homosexuelle", "gay", "lesbienne", "homo", "goudou"],
            "target_sex": TargetSex.SAME,
            "target_orientation": TargetOrientation.HOMO,
        },
        "bisexual": {
            "accepted": ["bisexuel", "bisexual", "bi", "all", "tout"],
            "target_sex": TargetSex.ALL,
            "target_orientation": TargetOrientation.ALL,
        },
        "asexual": {
            "accepted": ["asexual", "asexuel"],
            "target_sex": TargetSex.ALL,
            "target_orientation": TargetOrientation.ALL,
        },
        "other": {
            "accepted": ["autre", "other"],
            "target_sex": TargetSex.ALL,
            "target_orientation": TargetOrientation.OTHER,
        }
    }
    
    @staticmethod
    def get():
        return Orientations.available.keys

    @staticmethod
    def target(sex, orientation):
        if orientation not in Orientations.keys:
            return None

        target_sex = None
        if Orientations.available[orientation]["target_sex"] == TargetSex.SAME:
            target_sex = Sexs.same(sex)
        elif Orientations.available[orientation]["target_sex"] == TargetSex.OPPOSITE:
            target_sex = Sexs.opposite(sex)

        target_orientation = None
        if Orientations.available[orientation]["target_orientation"] == TargetOrientation.HETERO:
            target_orientation = [Orientations.available.keys[0]]
        elif Orientations.available[orientation]["target_orientation"] == TargetOrientation.HOMO:
            target_orientation = [Orientations.available.keys[1]]
        elif Orientations.available[orientation]["target_orientation"] == TargetOrientation.ALL:
            target_orientation = Orientations.available.keys
        else:
            target_orientation = [Orientations.available.keys[-1]]

        return {"sexs": target_sex, "orientations": target_orientation}
