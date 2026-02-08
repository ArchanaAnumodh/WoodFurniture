from django.db import models
class Product(models.Model):
    CATEGORY_CHOICES = [
        ("sofa", "Sofa"),
        ("chair", "Chair"),
        ("table", "Table"),
        ("cupboard", "Cupboard"),
    ]

    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.TextField()
    dimensions = models.CharField(max_length=100)

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="products/")

    def __str__(self):
        return f"Image for {self.product.name}"
